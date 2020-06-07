document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    /* INICIO VERIFICAR BROWSER */
    const isIncognito = () => {
        return new Promise((resolve, reject) => {
            if ("storage" in navigator && "estimate" in navigator.storage) {
                navigator.storage.estimate().then((res) => {
                    console.log(`Using ${res.usage} out of ${res.quota} bytes.`);
                    if (res.quota < 120000000) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            } else {
                reject(false);
            }
        });
    };
    /* FINAL VERIFICAR BROWSER */

    /* INICIO ENVIAR DATOS POR POST */

    function enviarUserData(userData) {
        $.ajax({
            url: "/",
            type: "POST",
            data: JSON.stringify([
                { dataUser: userData },
            ]),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                console.log("Se envio con exito!!");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }
    /* FINAL ENVIAR DATOS POR POST */

    /* INICIO FINGERPRINT */

    Fingerprint2.get({
        preprocessor: function (key, value) {
            if (key == "userAgent") {
                var parser = UAParser(value);

                console.log('parser ', parser);
                var userAgentMinusVersion = parser.os.name + ' ' + parser.browser.name
                return userAgentMinusVersion
            }
            return value
        }
    }, function (components) {
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31);

        // VERIFICA EL BROWSER ES O NO INCOGNITO
        isIncognito().then(yes => {
            console.log(yes);
            // GUARDAR HASH
            localStorage.setItem('testObject hash', JSON.stringify(murmur));
            var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
            console.log('retrievedObject: ', retrievedObject);
            //ENVIAR LA INFORMACION 
            enviarUserData(JSON.stringify(murmur));

        }).catch(isnot => {
            console.log(isnot);
            // GUARDAR USERAGENT
            localStorage.setItem('testUser USERAGENT', JSON.stringify(values));
            var retrievedUser = JSON.parse(localStorage.getItem('testUser'));
            console.log('retrievedUser: ', retrievedUser);
            //ENVIAR LA INFORMACION 
            enviarUserData(JSON.stringify(values));
        })

    })

    /* FINAL FINGERPRINT  */



});

