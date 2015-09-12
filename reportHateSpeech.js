/*************

Nazis, Rassisten, Pegidas etc. hetzen auf Facebook gegen Ausländer und Flüchtlinge. Obwohl
solche Hass-Kommentare Straftaten (Volksverhetzung, Beleidigung, ...) sind, passiert relativ wenig.

In einigen Fällen sind aber schon:

- Polizei ermittelt wegen Facebook-Hetze (Strafe von 4.800 Euro)
  http://www.swr.de/landesschau-aktuell/bw/hasskommentare-gegen-fluechtlinge-polizei-ermittelt-wegen-facebook-hetze/-/id=1622/did=16033662/nid=1622/1wz0scg/

oder

- Kündigung wegen Facebook-Hetze: „Das ist meine private Meinung!“ hat auch Grenzen
  http://t3n.de/news/kuendigung-facebook-hetze-634285/

Damit die Beispiele keine Ausnahmen bleiben, könnte man entsprechende Facebook Seiten automatisiert
nach Hass-Kommentaren durchsuchen, diese sammeln und veröffentlichen bzw. archivieren, sodass
Ermittlungen einfacher werden oder man benachrichtigt die Arbeitgeber von Usern, die ihren Job
auf dem Facebook Profil veröffentlicht haben.

Das ganze wäre nicht nur technisch eine Herausforderung, weil die Kommentare gefiltert werden müssen
und man Fake accounts von echt Namen unterscheiden muss, sondern natürlich auch politisch, weil man
damit Menschen an den Pranger stellt und sich viele Feinde machen könnte.

Manuell wird so etwas auch schon gemacht: http://perlen-aus-freital.tumblr.com/

Meldestelle für Postings
https://www.facebook.com/notes/1623524931255794/

Hier könnt Ihr schnell und anonym Strafanzeige erstatten:
https://www.bkms-system.net/bkwebanon/report/clientinfo?cin=12lkabw23re&language=ger



 ,Hass-Kommentare auf Facebook anzeigen

1. search comments

- scrape comments from pegida etc. via graph api
- test for 'hate'-words (pegida text corpus)
- test for fake name (db of top X german first/lastnames)
- scrape work, location etc. via casper js scraper
- screenshot of fb comments -> upload to imgur

1b add comments by url

2. website
  - display comments with URL + screenshot + date
  - rate
    a) hate speech / free speech?
    b) fake account?
  - report
    - to police
    - to company (scrape email -> prepared email text + screenshot)



*************/
