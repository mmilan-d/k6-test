**K6 Load Tesztelés Dokumentáció**

Mire jó a load teszt?
- A load tesztelés során olyan tesztkörnyezetet hozunk létre, amelyben szimuláljuk a szoftverünknek a valós életben jelentkező terheléseket. A load teszt alapvető célja, hogy megmérje a rendszerünk reakcióját és teljesítményét olyan körülmények között, amelyek megegyeznek vagy akár meghaladják a normál használatot.

- A k6 egy olyen load tesztelő eszköz, melyet arra fejlesztettek ki, hogy mérje és elemzze a webalkalmazások terhelési szintjeit. Segítségével meghatározható, hogy az alkalmazás hogyan viselkedik nagy terhelés alatt, hogy a rendszer időben és megfelelően válaszol-e a kérésekre.

Setup:
- Windows: "choco install k6" vagy "winget install k6"
- MacOS: "brew install k6"
- Linux:
    Debian/Ubuntu:
        sudo gpg -k
        sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
        echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
        sudo apt-get update
        sudo apt-get install k6
    Fedora/CentOS:
        sudo dnf install https://dl.k6.io/rpm/repo.rpm
        sudo dnf install k6

Konfiguráció:
- A K6 konfigurálása nagyon rugalmas. Az egyszerű parancssori opcióktól a JSON konfigurációs fájlon át a JavaScript API-ig számos módon testre szabhatjuk a teszteket. Az igényeknek megfelelően állíthatóak be a szimulált virtuális felhasználók (VUs) száma, az iterációk száma, az egyes tesztek időtartama, stb.

- https://k6.io/docs/using-k6/k6-options/reference/

Hogyan írj teszteseteket?
- A teszteseteket JavaScript nyelven írjuk a K6-hoz. Egy teszteset tartalmazza a tesztelendő URL-eket, a különböző HTTP metódusokat (GET, POST, stb.), valamint a teszteléshez szükséges adatokat és szkripteket. A K6 lehetőséget biztosít arra is, hogy a tesztesetekben különböző szcenáriókat és terhelési modelleket definiáljunk, például lépcsőzetes növelést vagy csökkenést, konstans terhelést, stb.

    HAR TO K6:
        1. HAR file rögzítése:
        I. Új inkognító ablak
        II. F12 => Network => aktiváld a hálózati napló rögzítését
        III. Menj végig manuálisan a tesztelni kívánt URL-eken
        IV. Válassz ki egy tetszőleges URL-t, majd jobb klikk => Az összes mentése mint HAR

        2. HAR to k6 Konvertálás:
        I. har-to-k6 repo installálása (ha nincs még installálva): $ npm install -g har-to-k6 
        II. HAR konvertálása K6 fájlá: har-to-k6 myfile.har -o loadtest.js

        3. K6 fájl konfigurálása:
        I: Options konfigurálása
            pl.:
            export const options = {
                vus: 10,
                duration: '30s',
            };
        II. Third-party content törlése (ha van)

        4. Teszt futtatása: $ k6 run loadtest.js

    K6 Cloud Dashboard:

        AUTH TOKEN és PROJECT_ID, illetve a teszt eredménye itt található:
        https://app.k6.io/tests/new

        Lépések:

        1.Hitelesítsd a k6 fiókodat:
        k6 login cloud -t {AUTH_TOKEN}

        2.Bővítsd ki a teszt fájlt ezzel az opcióval: 
        export const options = {
        vus: 1,
        ext: {
            loadimpact: {
            projectID: {YOUR_PROJECT_ID}
            name: "TEST NAME"
            }
        }
        }

        3.Teszt elindítása:
        k6 cloud {TEST_NAME.js}

Teszt eredményének kiértékelése:
- Ha a tesztet lokálisan futtattuk, akkor a teszt futásának végeztével a konzolban kapunk különböző mérőszámokat eredményül. A K6 kimenetei között megtalálható a teszt általános statisztikája, a HTTP kérések időtartamának eloszlása, a sikeres és sikertelen kérések száma, stb. Ezeket az adatokat használhatjuk az alkalmazás teljesítményének elemzésére. A tesztelés sikere vagy sikertelensége attól függ, hogy az alkalmazás hogyan teljesít a teszt során. Ha az alkalmazás a terhelés alatt is megfelelően működik, gyorsan és helyesen reagál a kérésekre, akkor a teszt sikeres. Ha az alkalmazás lassul, hibás válaszokat küld, vagy egyáltalán nem reagál, akkor a teszt sikertelen.

Known Issues/Limitations:
- A tesztek írása csakis JavaScriptben történhet
- A K6 a tesztek futtatásához nagy mennyiségű erőforrást igényel, ami korlátozhatja a nagyobb skálájú tesztek futtatását.

