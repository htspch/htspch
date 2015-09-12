/*************

1. scrape comments from pegida etc. via graph api
2. test for 'hate'-words
3. scrape work, location etc. via casper js scraper


*************/

var graph = require('fbgraph'),
  mongoose = require('mongoose'),
  assert = require('assert');

// Read input
var pages = require('./pages.json').pages;
var keywords = require('./keywords.json').keywords;

var keywordsRegExp = (function(keywords) {
  return new RegExp(keywords.join('|'), 'i');
})(keywords);

// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/hatespeech');

// Define schema for collection
var FbComment = mongoose.model('FbComment', {
  commentId: { type: String, unique: true },
  postId: String,
  pageId: String,
  author: {
    userId: Number,
    firstName: String,
    lastName: String,
    work: String,
    location: String
  },
  created: { type: Date, default: Date.now },
  hateSpeech: Boolean,
  realName: Boolean,
  message: String
});
var comments = [];
var saveComment = function (err, res) {
  assert.equal(null, err);

  console.log('Saved successfully:', res);
};

// TODO: Get fresh accessToekn
graph.setAccessToken('107364809311932|PvzUlJ0xEtHSpIWMK-QogMGntM0');

// Iterate over all pages
for(var i=1; i < pages.length; i++) {
  var pageId = pages[i];

  // Fetch all (recent) posts of page
  graph.get(pageId + '/posts', function(err, res) {
    assert.equal(null, err);

    // Loop posts
    for(var i = 0; i < res.data.length; i++) {
      var postData = res.data[i];
      // console.log("Post = " + .message);
      graph.get(postData.id + '/comments', function(err, res) {
        assert.equal(null, err);

        for(var i = 0; i < res.data.length; i++) {
          var commentData = res.data[i];

          FbComment.findOne({commentId: commentData.id}, function(err, existingComment) {
            if(!err && !existingComment) {
              graph.get(commentData.from.id + '?fields=id,name,first_name,last_name,gender,education,hometown,locale,work,location', function(err, res) {
                if(err) {
                  if(err.code == 100) { // Tried accessing nonexisting field on node type (Page)
                    return;
                  } else {
                    assert.equal(null, err);
                  }
                } else {
                  var userData = res;
                  var comment = new FbComment({
                    commentId: commentData.id,
                    postId: postData.id,
                    pageId: pageId,
                    author: {
                      userId: userData.id,
                      firstName: userData.first_name,
                      lastName: userData.last_name,
                      work: userData.work || "no work",
                      location: userData.location || "no location"
                    },
                    hateSpeech: commentData.message.match(keywordsRegExp),
                    realName: false,
                    message: commentData.message
                  });

                  comment.save(saveComment);

                  // check for fake name + hate comment
                  if(commentData.message.match(keywordsRegExp)) {
                    console.log(res, commentData);
                  }
                }
              }.bind({commentData: commentData, postData: postData, pageId: pageId}));
            } else {
              console.log("Comment already exist: ", existingComment);
            }
          }.bind({commentData: commentData, postData: postData, pageId: pageId}));

        }
      }.bind({postData: postData, pageId: pageId}));
    }
  }.bind({pageId: pageId}));
  break;
}
