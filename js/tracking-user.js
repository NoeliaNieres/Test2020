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

    isIncognito().then(yes => {
        console.log(yes);
        // GUARDAR HASH
        localStorage.setItem('testObject hash', JSON.stringify(murmur));
        var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
        console.log('retrievedObject: ', retrievedObject);

    }).catch(isnot => {
        console.log(isnot);
        // GUARDAR USERAGENT
        localStorage.setItem('testUser USERAGENT', JSON.stringify(values));
        var retrievedUser = JSON.parse(localStorage.getItem('testUser'));
        console.log('retrievedUser: ', retrievedUser);
    })

})


/* FINAL FINGERPRINT  */


