Das Repo enthält zwei Komponentenm die App und den Server

## Client (App)
Die App verwendet ionic als Framework. Zum starten muss NPM installiert sein.  
In der Datei `hcir/src/app/globals.ts` muss der entsprechende Server und API Key hinterlegt werden.
### Starten im Webbrower
````
npm install
ionic serve
````

### App builden
````
ionic build --prod
````

## Server
Der Server benötigt einen Webserver (Apache2 oder nginx) mit PHP 8.0 oder neuer sowie eine MySQL Datenbank.  
Die Datei `hcir.sql` enthält eine importierbare Datenbankstruktur.
