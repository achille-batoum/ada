//! moment.js
//! version: 2.29.1
//! auteurs: Tim Wood, Iskren Chernev, contributeurs Moment.js
//! licence: MIT
//! momentjs.com

; (fonction (global, usine) {
    typeof exports === 'objet' && typeof module! == 'undefined'? module.exports = usine ():
    typeof define === 'fonction' && define.amd? définir (usine):
    global.moment = usine ()
} (this, (function () {'use strict';

    var hookCallback;

    hooks de fonction () {
        return hookCallback.apply (null, arguments);
    }

    // Ceci est fait pour enregistrer la méthode appelée avec moment ()
    // sans créer de dépendances circulaires.
    function setHookCallback (rappel) {
        hookCallback = rappel;
    }

    function isArray (entrée) {
        revenir (
            instance d'entrée de Array ||
            Object.prototype.toString.call (entrée) === '[object Array]'
        );
    }

    function isObject (entrée) {
        // IE8 traitera undefined et null comme un objet si ce n'était pas pour
        // entrée! = null
        revenir (
            input! = null &&
            Object.prototype.toString.call (entrée) === '[objet objet]'
        );
    }

    function hasOwnProp (a, b) {
        return Object.prototype.hasOwnProperty.call (a, b);
    }

    function isObjectEmpty (obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames (obj) .length === 0;
        } autre {
            var k;
            for (k dans obj) {
                if (hasOwnProp (obj, k)) {
                    retourne faux;
                }
            }
            retourne vrai;
        }
    }

    function isUndefined (entrée) {
        entrée de retour === void 0;
    }

    function isNumber (entrée) {
        revenir (
            type d'entrée === 'nombre' ||
            Object.prototype.toString.call (entrée) === '[numéro d'objet]'
        );
    }

    function isDate (entrée) {
        revenir (
            input instanceof Date ||
            Object.prototype.toString.call (entrée) === '[objet Date]'
        );
    }

    carte de fonction (arr, fn) {
        var res = [],
            je;
        pour (i = 0; i <arr.length; ++ i) {
            res.push (fn (arr [i], i));
        }
        return res;
    }

    function extend (a, b) {
        for (var i in b) {
            if (hasOwnProp (b, i)) {
                a [i] = b [i];
            }
        }

        if (hasOwnProp (b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp (b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (entrée, format, locale, stricte) {
        return createLocalOrUTC (entrée, format, locale, strict, vrai) .utc ();
    }

    function defaultParsingFlags () {
        // Nous devons cloner en profondeur cet objet.
        revenir {
            vide: faux,
            SpareTokens: [],
            non utilisé: [],
            débordement: -2,
            charsLeftOver: 0,
            nullInput: faux,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: faux,
            userInvalidated: faux,
            iso: faux,
            parsedDateParts: [],
            époque: nulle,
            meridiem: nul,
            rfc2822: faux,
            week-endMismatch: faux,
        };
    }

    function getParsingFlags (m) {
        si (m._pf == null) {
            m._pf = defaultParsingFlags ();
        }
        return m._pf;
    }

    var certains;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } autre {
        certains = fonction (amusant) {
            var t = Object (this),
                len = t.length >>> 0,
                je;

            pour (i = 0; i <len; i ++) {
                if (i dans t && fun.call (this, t [i], i, t)) {
                    retourne vrai;
                }
            }

            retourne faux;
        };
    }

    function isValid (m) {
        if (m._isValid == null) {
            var flags = getParsingFlags (m),
                parsedParts = some.call (flags.parsedDateParts, function (i) {
                    retourne i! = null;
                }),
                isNowValid =
                    ! isNaN (m._d.getTime ()) &&
                    flags.overflow <0 &&
                    ! flags.empty &&
                    ! flags.invalidEra &&
                    ! flags.invalidMois &&
                    ! flags.invalidWeekday &&
                    ! flags.weekdayMismatch &&
                    ! flags.nullInput &&
                    ! flags.invalidFormat &&
                    ! flags.userInvalidé &&
                    (! flags.meridiem || (flags.meridiem && parsedParts));

            si (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null ||! Object.isFrozen (m)) {
                m._isValid = isNowValid;
            } autre {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (drapeaux) {
        var m = createUTC (NaN);
        if (flags! = null) {
            étendre (getParsingFlags (m), indicateurs);
        } autre {
            getParsingFlags (m) .userInvalidated = true;
        }

        return m;
    }

    // Les plugins qui ajoutent des propriétés doivent également ajouter la clé ici (valeur nulle),
    // afin que nous puissions nous cloner correctement.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig (vers, depuis) ​​{
        var i, prop, val;

        if (! isUndefined (from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (! isUndefined (from._i)) {
            to._i = from._i;
        }
        if (! isUndefined (from._f)) {
            to._f = from._f;
        }
        if (! isUndefined (from._l)) {
            to._l = from._l;
        }
        if (! isUndefined (from._strict)) {
            to._strict = from._strict;
        }
        if (! isUndefined (from._tzm)) {
            to._tzm = from._tzm;
        }
        if (! isUndefined (from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (! isUndefined (from._offset)) {
            to._offset = from._offset;
        }
        if (! isUndefined (from._pf)) {
            to._pf = getParsingFlags (à partir de);
        }
        if (! isUndefined (from._locale)) {
            to._locale = de._locale;
        }

        if (momentProperties.length> 0) {
            pour (i = 0; i <momentProperties.length; i ++) {
                prop = momentProperties [i];
                val = de [prop];
                if (! isUndefined (val)) {
                    à [prop] = val;
                }
            }
        }

        retourner à;
    }

    // Objet prototype Moment
    function Moment (config) {
        copyConfig (this, config);
        this._d = new Date (config._d! = null? config._d.getTime (): NaN);
        if (! this.isValid ()) {
            this._d = nouvelle date (NaN);
        }
        // Empêche la boucle infinie au cas où updateOffset crée un nouveau moment
        // objets.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset (this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        revenir (
            obj instanceof Moment || (obj! = null && obj._isAMomentObject! = null)
        );
    }

    function warn (msg) {
        si (
            hooks.suppressDeprecationWarnings === false &&
            type de console! == 'indéfini' &&
            console.warn
        ) {
            console.warn ('Avertissement de dépréciation:' + msg);
        }
    }

    fonction obsolète (msg, fn) {
        var firstTime = vrai;

        return extend (fonction () {
            if (hooks.deprecationHandler! = null) {
                hooks.deprecationHandler (null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    je,
                    clé;
                pour (i = 0; i <arguments.length; i ++) {
                    arg = '';
                    if (type d'arguments [i] === 'objet') {
                        arg + = '\ n [' + i + ']';
                        for (entrez les arguments [0]) {
                            if (hasOwnProp (arguments [0], clé)) {
                                arg + = clé + ':' + arguments [0] [clé] + ',';
                            }
                        }
                        arg = arg.slice (0, -2); // Supprime la virgule et l'espace de fin
                    } autre {
                        arg = arguments [i];
                    }
                    args.push (arg);
                }
                prévenir(
                    msg +
                        '\ nArguments:' +
                        Array.prototype.slice.call (args) .join ('') +
                        '\ n' +
                        new Error (). stack
                );
                firstTime = false;
            }
            return fn.apply (ceci, arguments);
        }, fn);
    }

    var obsolètes = {};

    function deprecateSimple (nom, msg) {
        if (hooks.deprecationHandler! = null) {
            hooks.deprecationHandler (nom, msg);
        }
        if (! obsolescence [nom]) {
            avertir (msg);
            obsolètes [nom] = vrai;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction (entrée) {
        revenir (
            (typeof Function! == 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call (entrée) === '[objet Fonction]'
        );
    }

    ensemble de fonctions (config) {
        var prop, i;
        for (i dans la configuration) {
            if (hasOwnProp (config, i)) {
                prop = config [i];
                if (isFunction (prop)) {
                    ceci [i] = accessoire;
                } autre {
                    ceci ['_' + i] = accessoire;
                }
            }
        }
        this._config = config;
        // L'analyse ordinale clémente n'accepte qu'un nombre en plus de
        // nombre + (éventuellement) des trucs provenant de _dayOfMonthOrdinalParse.
        // TODO: Supprimez le repli "ordinalParse" dans la prochaine version majeure.
        this._dayOfMonthOrdinalParseLenient = nouveau RegExp (
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs (parentConfig, childConfig) {
        var res = extend ({}, parentConfig),
            soutenir;
        for (prop dans childConfig) {
            if (hasOwnProp (childConfig, prop)) {
                if (isObject (parentConfig [prop]) && isObject (childConfig [prop])) {
                    res [prop] = {};
                    étendre (res [prop], parentConfig [prop]);
                    étendre (res [prop], childConfig [prop]);
                } else if (childConfig [prop]! = null) {
                    res [prop] = childConfig [prop];
                } autre {
                    supprimer res [prop];
                }
            }
        }
        for (prop dans parentConfig) {
            si (
                hasOwnProp (parentConfig, prop) &&
                ! hasOwnProp (childConfig, prop) &&
                isObject (parentConfig [prop])
            ) {
                // assurez-vous que les modifications des propriétés ne modifient pas la configuration parent
                res [prop] = étendre ({}, res [prop]);
            }
        }
        return res;
    }

    function Locale (config) {
        if (config! = null) {
            this.set (config);
        }
    }

    var clés;

    if (Object.keys) {
        keys = Object.keys;
    } autre {
        touches = fonction (obj) {
            var i,
                res = [];
            for (i dans obj) {
                if (hasOwnProp (obj, i)) {
                    res.push (i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: «[Aujourd'hui à] LT»,
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Hier à] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    calendrier des fonctions (clé, maman, maintenant) {
        var output = this._calendar [clé] || this._calendar ['sameElse'];
        return isFunction (sortie)? output.call (maman, maintenant): sortie;
    }

    function zeroFill (nombre, targetLength, forceSign) {
        var absNumber = '' + Math.abs (nombre),
            zerosToFill = targetLength - absNumber.length,
            signe = nombre> = 0;
        revenir (
            (signe? (forceSign? '+': ''): '-') +
            Math.pow (10, Math.max (0, zerosToFill)). ToString (). Substr (1) +
            absNumber
        );
    }

    var formattingTokens = / (\ [[^ \ [] * \]) | (\\)? ([Hh] mm (ss)? | Mo | MM? M? M? | Do | DDDo | DD? D? D ? | ddd? d? | do? | w [o | w]? | W [o | W]? | Qo? | N {1,5} | YYYYYY | YYYYY | YYYY | YY | y {2,4} | yo? | gg (ggg?)? | GG (GGG?)? | e | E | a | A | hh? | HH? | kk? | mm? | ss? | S {1,9} | x | X | zz? | ZZ? |.) / G,
        localFormattingTokens = / (\ [[^ \ [] * \]) | (\\)? (LTS | LT | LL? L? L? | l {1,4}) / g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // jeton: 'M'
    // rembourré: ['MM', 2]
    // ordinal: 'Mo'
    // rappel: function () {this.month () + 1}
    function addFormatToken (token, padded, ordinal, callback) {
        var func = rappel;
        if (typeof callback === 'string') {
            func = function () {
                renvoie ce [rappel] ();
            };
        }
        if (jeton) {
            formatTokenFunctions [jeton] = func;
        }
        if (rembourré) {
            formatTokenFunctions [padded [0]] = function () {
                return zeroFill (func.apply (this, arguments), padded [1], padded [2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions [ordinal] = function () {
                renvoie this.localeData (). ordinal (
                    func.apply (ceci, arguments),
                    jeton
                );
            };
        }
    }

    function removeFormattingTokens (entrée) {
        if (input.match (/ \ [[\ s \ S] /)) {
            return input.replace (/ ^ \ [| \] $ / g, '');
        }
        return input.replace (/ \\ / g, '');
    }

    function makeFormatFunction (format) {
        var array = format.match (formattingTokens),
            je,
            longueur;

        for (i = 0, length = array.length; i <length; i ++) {
            if (formatTokenFunctions [tableau [i]]) {
                array [i] = formatTokenFunctions [array [i]];
            } autre {
                tableau [i] = removeFormattingTokens (tableau [i]);
            }
        }

        fonction de retour (maman) {
            var sortie = '',
                je;
            pour (i = 0; i <longueur; i ++) {
                output + = isFunction (tableau [i])
                    ? array [i] .call (maman, format)
                    : tableau [i];
            }
            sortie de retour;
        };
    }

    // formater la date en utilisant l'objet de date natif
    function formatMoment (m, format) {
        if (! m.isValid ()) {
            return m.localeData (). invalidDate ();
        }

        format = expandFormat (format, m.localeData ());
        formatFunctions [format] =
            formatFunctions [format] || makeFormatFunction (format);

        return formatFunctions [format] (m);
    }

    function expandFormat (format, paramètres régionaux) {
        var i = 5;

        function replaceLongDateFormatTokens (entrée) {
            retourne locale.longDateFormat (entrée) || saisir;
        }

        localFormattingTokens.lastIndex = 0;
        while (i> = 0 && localFormattingTokens.test (format)) {
            format = format.replace (
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i - = 1;
        }

        format de retour;
    }

    var defaultLongDateFormat = {
        LTS: 'h: mm: ss A',
        LT: 'h: mm A',
        L: 'MM / JJ / AAAA',
        LL: 'MMMM J, AAAA',
        LLL: 'MMMM D, AAAA h: mm A',
        LLLL: 'jjjj, MMMM J, AAAA h: mm A',
    };

    function longDateFormat (clé) {
        var format = this._longDateFormat [clé],
            formatUpper = this._longDateFormat [key.toUpperCase ()];

        if (format ||! formatUpper) {
            format de retour;
        }

        this._longDateFormat [clé] = formatUpper
            .match (formattingTokens)
            .map (fonction (tok) {
                si (
                    tok === 'MMMM' ||
                    jeton === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    retournez tok.slice (1);
                }
                jeton de retour;
            })
            .rejoindre('');

        return this._longDateFormat [clé];
    }

    var defaultInvalidDate = 'Date invalide';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '% d',
        defaultDayOfMonthOrdinalParse = / \ d {1,2} /;

    fonction ordinal (nombre) {
        return this._ordinal.replace ('% d', nombre);
    }

    var defaultRelativeTime = {
        futur: 'dans% s',
        passé: '% s il y a',
        s: 'quelques secondes',
        ss: '% d secondes',
        m: 'une minute',
        mm: '% d minutes',
        h: 'une heure',
        hh: '% d heures',
        d: 'un jour',
        jj: '% d jours',
        w: 'une semaine',
        ww: '% d semaines',
        M: 'un mois',
        MM: '% d mois',
        y: 'un an',
        aa: '% d ans',
    };

    function relativeTime (nombre, sans suffixe, chaîne, isFuture) {
        var output = this._relativeTime [chaîne];
        return isFunction (sortie)
            ? sortie (nombre, sans suffixe, chaîne, isFuture)
            : sortie.replace (/% d / i, nombre);
    }

    function pastFuture (diff, sortie) {
        var format = this._relativeTime [diff> 0? 'futur': 'passé'];
        renvoyer isFunction (format)? format (sortie): format.replace (/% s / i, sortie);
    }

    var alias = {};

    function addUnitAlias ​​(unité, raccourci) {
        var lowerCase = unit.toLowerCase ();
        alias [lowerCase] ​​= alias [lowerCase + 's'] = alias [raccourci] = unité;
    }

    function normalizeUnits (unités) {
        return typeof units === 'string'
            ? alias [unités] || alias [units.toLowerCase ()]
            : indéfini;
    }

    function normalizeObjectUnits (inputObject) {
        var normalizedInput = {},
            normaliséProp,
            soutenir;

        for (prop dans inputObject) {
            if (hasOwnProp (inputObject, prop)) {
                normalizedProp = normalizeUnits (prop);
                if (normalizedProp) {
                    normalizedInput [normalizedProp] = inputObject [prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorités = {};

    function addUnitPriority (unité, priorité) {
        priorités [unité] = priorité;
    }

    function getPrioritizedUnits (unitsObj) {
        var unités = [],
            u;
        for (u dans unitsObj) {
            if (hasOwnProp (unitsObj, u)) {
                units.push ({unit: u, priority: priority [u]});
            }
        }
        units.sort (fonction (a, b) {
            retourne a.priority - b.priority;
        });
        unités de retour;
    }

    function isLeapYear (année) {
        return (année% 4 === 0 && année% 100! == 0) || année% 400 === 0;
    }

    function absFloor (nombre) {
        if (nombre <0) {
            // -0 -> 0
            retourne Math.ceil (nombre) || 0;
        } autre {
            return Math.floor (nombre);
        }
    }

    function toInt (argumentForCoercion) {
        var coercedNumber = + argumentForCoercion,
            valeur = 0;

        if (coercedNumber! == 0 && isFinite (coercedNumber)) {
            valeur = absFloor (coercedNumber);
        }

        valeur de retour;
    }

    function makeGetSet (unité, keepTime) {
        fonction de retour (valeur) {
            if (valeur! = null) {
                set $ 1 (this, unit, value);
                hooks.updateOffset (ceci, keepTime);
                renvoyer ceci;
            } autre {
                return get (this, unit);
            }
        };
    }

    function get (maman, unité) {
        retour maman.isValid ()
            ? mom._d ['obtenir' + (maman._isUTC? 'UTC': '') + unité] ()
            : NaN;
    }

    ensemble de fonctions $ 1 (maman, unité, valeur) {
        if (mom.isValid () &&! isNaN (valeur)) {
            si (
                unité === 'FullYear' &&
                isLeapYear (mom.year ()) &&
                mom.month () === 1 &&
                mom.date () === 29
            ) {
                valeur = toInt (valeur);
                mom._d ['set' + (mom._isUTC? 'UTC': '') + unit] (
                    évaluer,
                    mom.month (),
                    daysInMonth (valeur, mom.month ())
                );
            } autre {
                mom._d ['set' + (mom._isUTC? 'UTC': '') + unit] (valeur);
            }
        }
    }

    // DES MOMENTS

    function stringGet (unités) {
        units = normalizeUnits (unités);
        if (isFunction (this [unités])) {
            renvoie ceci [unités] ();
        }
        renvoyer ceci;
    }

    function stringSet (unités, valeur) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits (unités);
            var priority = getPrioritizedUnits (unités),
                je;
            pour (i = 0; i <priority.length; i ++) {
                cette [priorité [i] .unité] (unités [priorisée [i] .unité]);
            }
        } autre {
            units = normalizeUnits (unités);
            if (isFunction (this [unités])) {
                renvoie cette [unités] (valeur);
            }
        }
        renvoyer ceci;
    }

    var match1 = / \ d /, // 0 - 9
        match2 = / \ d \ d /, // 00 - 99
        match3 = / \ d {3} /, // 000 - 999
        match4 = / \ d {4} /, // 0000 - 9999
        match6 = / [+ -]? \ d {6} /, // -999999 - 999999
        match1to2 = / \ d \ d? /, // 0 - 99
        match3to4 = / \ d \ d \ d \ d? /, // 999 - 9999
        match5to6 = / \ d \ d \ d \ d \ d \ d? /, // 99999 - 999999
        match1to3 = / \ d {1,3} /, // 0 - 999
        match1to4 = / \ d {1,4} /, // 0 - 9999
        match1to6 = / [+ -]? \ d {1,6} /, // -999999 - 999999
        matchUnsigned = / \ d + /, // 0 - inf
        matchSigned = / [+ -]? \ d + /, // -inf - inf
        matchOffset = / Z | [+ -] \ d \ d:? \ d \ d / gi, // +00: 00 -00: 00 +0000 -0000 ou Z
        matchShortOffset = / Z | [+ -] \ d \ d (? ::? \ d \ d)? / gi, // +00 -00 +00: 00 -00: 00 +0000 -0000 ou Z
        matchTimestamp = /[+- </font>?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // n'importe quel mot (ou deux) caractères ou nombres, y compris deux / trois mots mois en arabe.
        // comprend deux mots gaéliques écossais et des mois avec trait d'union
        matchWord = / [0-9] {0,256} ['az \ u00A0- \ u05FF \ u0700- \ uD7FF \ uF900- \ uFDCF \ uFDF0- \ uFF07 \ uFF10- \ uFFEF] {1,256} | [\ u0600- \ u06FF \ /] {1,256} (\ s *? [\ U0600- \ u06FF] {1,256}) {1,2} / i,
        regexes;

    regexes = {};

    function addRegexToken (jeton, expression régulière, strictRegex) {
        regexes [jeton] = isFunction (regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex? strictRegex: regex;
              };
    }

    function getParseRegexForToken (jeton, configuration) {
        if (! hasOwnProp (expressions régulières, jeton)) {
            return new RegExp (unescapeFormat (token));
        }

        return regexes [jeton] (config._strict, config._locale);
    }

    // Code de http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat (s) {
        retourne regexEscape (
            s
                .replace ('\\', '')
                .replace (/ \\ (\ [) | \\ (\]) | \ [([^ \] \ [] *) \] | \\ (.) / g, fonction (
                    apparié,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    retour p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape (s) {
        retourne à la place (/ [- \ / \\ ^ $ * + ?. () | [\] {}] / g, '\\ $ &');
    }

    var tokens = {};

    function addParseToken (jeton, rappel) {
        var i,
            func = rappel;
        if (typeof token === 'string') {
            jeton = [jeton];
        }
        if (isNumber (rappel)) {
            func = function (entrée, tableau) {
                array [callback] = toInt (entrée);
            };
        }
        pour (i = 0; i <token.length; i ++) {
            jetons [jeton [i]] = func;
        }
    }

    function addWeekParseToken (jeton, rappel) {
        addParseToken (jeton, fonction (entrée, tableau, configuration, jeton) {
            config._w = config._w || {};
            rappel (entrée, config._w, config, jeton);
        });
    }

    function addTimeToArrayFromToken (jeton, entrée, configuration) {
        if (input! = null && hasOwnProp (tokens, token)) {
            jetons [jeton] (entrée, config._a, config, jeton);
        }
    }

    var YEAR = 0,
        MOIS = 1,
        DATE = 2,
        HEURE = 3,
        MINUTE = 4,
        SECONDE = 5,
        MILLISECOND = 6,
        SEMAINE = 7,
        JOUR DE SEMAINE = 8;

    fonction mod (n, x) {
        retourne ((n% x) + x)% x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } autre {
        indexOf = fonction (o) {
            // Je sais
            var i;
            pour (i = 0; i <this.length; ++ i) {
                if (this [i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth (année, mois) {
        if (isNaN (année) || isNaN (mois)) {
            return NaN;
        }
        var modMonth = mod (mois, 12);
        année + = (mois - moisMois) / 12;
        return modMonth === 1
            ? isLeapYear (année)
                ? 29
                : 28
            : 31 - ((modMonth% 7)% 2);
    }

    // MISE EN PAGE

    addFormatToken ('M', ['MM', 2], 'Mo', function () {
        renvoie this.month () + 1;
    });

    addFormatToken ('MMM', 0, 0, fonction (format) {
        return this.localeData (). monthShort (this, format);
    });

    addFormatToken ('MMMM', 0, 0, fonction (format) {
        return this.localeData (). months (this, format);
    });

    // ALIASES

    addUnitAlias ​​('mois', 'M');

    // PRIORITÉ

    addUnitPriority ('mois', 8);

    // PARSING

    addRegexToken ('M', match1to2);
    addRegexToken ('MM', match1to2, match2);
    addRegexToken ('MMM', fonction (isStrict, locale) {
        return locale.monthsShortRegex (isStrict);
    });
    addRegexToken ('MMMM', fonction (isStrict, locale) {
        retourne locale.monthsRegex (isStrict);
    });

    addParseToken (['M', 'MM'], function (input, array) {
        array [MONTH] = toInt (entrée) - 1;
    });

    addParseToken (['MMM', 'MMMM'], function (input, array, config, token) {
        var mois = config._locale.monthsParse (entrée, jeton, config._strict);
        // si nous n'avons pas trouvé de nom de mois, marquez la date comme invalide.
        if (mois! = null) {
            tableau [MONTH] = mois;
        } autre {
            getParsingFlags (config) .invalidMonth = entrée;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split (
            «_»
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split (
            «_»
        ),
        MONTHS_IN_FORMAT = / D [oD]? (\ [[^ \ [\]] * \] | \ S) + MMMM? /,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths (m, format) {
        si (! m) {
            retourne isArray (this._months)
                ? this._months
                : this._months ['autonome'];
        }
        retourne isArray (this._months)
            ? this._months [m.month ()]
            : this._months [
                  (this._months.isFormat || MONTHS_IN_FORMAT) .test (format)
                      ? 'format'
                      : 'autonome'
              ] [m.month ()];
    }

    function localeMonthsShort (m, format) {
        si (! m) {
            return isArray (this._monthsShort)
                ? this._monthsShort
                : this._monthsShort ['autonome'];
        }
        return isArray (this._monthsShort)
            ? this._monthsShort [m.month ()]
            : this._monthsShort [
                  MONTHS_IN_FORMAT.test (format)? 'format': 'autonome'
              ] [m.month ()];
    }

    function handleStrictParse (monthName, format, strict) {
        var i,
            ii,
            maman,
            llc = monthName.toLocaleLowerCase ();
        if (! this._monthsParse) {
            // ceci n'est pas utilisé
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            pour (i = 0; i <12; ++ i) {
                maman = créerUTC ([2000, i]);
                this._shortMonthsParse [i] = this.monthsShort (
                    maman,
                    ''
                ) .toLocaleLowerCase ();
                this._longMonthsParse [i] = this.months (maman, '') .toLocaleLowerCase ();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call (this._shortMonthsParse, llc);
                retourne ii! == -1? ii: nul;
            } autre {
                ii = indexOf.call (this._longMonthsParse, llc);
                retourne ii! == -1? ii: nul;
            }
        } autre {
            if (format === 'MMM') {
                ii = indexOf.call (this._shortMonthsParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._longMonthsParse, llc);
                retourne ii! == -1? ii: nul;
            } autre {
                ii = indexOf.call (this._longMonthsParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._shortMonthsParse, llc);
                retourne ii! == -1? ii: nul;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, maman, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call (this, monthName, format, strict);
        }

        if (! this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: ajouter un tri
        // Le tri vérifie si un mois (ou abbr) est le préfixe d'un autre
        // voir le tri dans computeMonthsParse
        pour (i = 0; i <12; i ++) {
            // créer le regex si nous ne l'avons pas déjà
            maman = créerUTC ([2000, i]);
            if (strict &&! this._longMonthsParse [i]) {
                this._longMonthsParse [i] = new RegExp (
                    '^' + this.months (maman, ``) .replace ('.', '') + '$',
                    'je'
                );
                this._shortMonthsParse [i] = nouveau RegExp (
                    '^' + this.monthsShort (maman, ``) .replace ('.', '') + '$',
                    'je'
                );
            }
            if (! strict &&! this._monthsParse [i]) {
                regex =
                    '^' + this.months (maman, ``) + '| ^' + this.monthsShort (maman, '');
                this._monthsParse [i] = new RegExp (regex.replace ('.', ''), 'i');
            }
            // teste l'expression régulière
            si (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse [i] .test (monthName)
            ) {
                return i;
            } sinon si (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse [i] .test (monthName)
            ) {
                return i;
            } else if (! strict && this._monthsParse [i] .test (monthName)) {
                return i;
            }
        }
    }

    // DES MOMENTS

    function setMonth (maman, valeur) {
        var dayOfMonth;

        if (! mom.isValid ()) {
            // Pas d'opération
            retour maman;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(valeur)) {
                valeur = toInt (valeur);
            } autre {
                valeur = mom.localeData (). monthParse (valeur);
                // TODO: Un autre échec silencieux?
                if (! isNumber (valeur)) {
                    retour maman;
                }
            }
        }

        dayOfMonth = Math.min (mom.date (), daysInMonth (mom.year (), value));
        mom._d ['set' + (mom._isUTC? 'UTC': '') + 'Month'] (valeur, dayOfMonth);
        retour maman;
    }

    function getSetMonth (valeur) {
        if (valeur! = null) {
            setMonth (this, valeur);
            hooks.updateOffset (ceci, vrai);
            renvoyer ceci;
        } autre {
            return get (this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth (this.year (), this.month ());
    }

    function monthShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (! hasOwnProp (this, '_monthsRegex')) {
                computeMonthsParse.call (this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } autre {
                return this._monthsShortRegex;
            }
        } autre {
            if (! hasOwnProp (this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            renvoie this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthRegex (isStrict) {
        if (this._monthsParseExact) {
            if (! hasOwnProp (this, '_monthsRegex')) {
                computeMonthsParse.call (this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } autre {
                return this._monthsRegex;
            }
        } autre {
            if (! hasOwnProp (this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            renvoie this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev (a, b) {
            retour b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            je,
            maman;
        pour (i = 0; i <12; i ++) {
            // créer le regex si nous ne l'avons pas déjà
            maman = créerUTC ([2000, i]);
            shortPieces.push (this.monthsShort (maman, ''));
            longPieces.push (this.months (maman, ''));
            mixedPieces.push (this.months (maman, ''));
            mixedPieces.push (this.monthsShort (maman, ''));
        }
        // Le tri s'assure que si un mois (ou abbr) est le préfixe d'un autre il
        // correspondra à la pièce la plus longue.
        shortPieces.sort (cmpLenRev);
        longPieces.sort (cmpLenRev);
        mixedPieces.sort (cmpLenRev);
        pour (i = 0; i <12; i ++) {
            shortPieces [i] = regexEscape (shortPieces [i]);
            LongPieces [i] = regexEscape (LongPieces [i]);
        }
        pour (i = 0; i <24; i ++) {
            mixedPieces [i] = regexEscape (mixedPieces [i]);
        }

        this._monthsRegex = new RegExp ('^ (' + mixedPieces.join ('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = nouveau RegExp (
            '^ (' + longPieces.join ('|') + ')',
            'je'
        );
        this._monthsShortStrictRegex = nouveau RegExp (
            '^ (' + shortPieces.join ('|') + ')',
            'je'
        );
    }

    // MISE EN PAGE

    addFormatToken ('Y', 0, 0, fonction () {
        var y = this.year ();
        renvoie y <= 9999? zeroFill (y, 4): '+' + y;
    });

    addFormatToken (0, ['YY', 2], 0, function () {
        retourne cette.année ()% 100;
    });

    addFormatToken (0, ['YYYY', 4], 0, 'année');
    addFormatToken (0, ['YYYYY', 5], 0, 'année');
    addFormatToken (0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias ​​('année', 'y');

    // PRIORITÉS

    addUnitPriority ('année', 1);

    // PARSING

    addRegexToken ('Y', matchSigned);
    addRegexToken ('YY', match1to2, match2);
    addRegexToken ('YYYY', match1to4, match4);
    addRegexToken ('YYYYY', match1to6, match6);
    addRegexToken ('YYYYYY', match1to6, match6);

    addParseToken (['YYYYY', 'YYYYYY'], YEAR);
    addParseToken ('YYYY', fonction (entrée, tableau) {
        tableau [YEAR] =
            input.length === 2? hooks.parseTwoDigitYear (entrée): toInt (entrée);
    });
    addParseToken ('YY', fonction (entrée, tableau) {
        array [YEAR] = hooks.parseTwoDigitYear (entrée);
    });
    addParseToken ('Y', fonction (entrée, tableau) {
        array [YEAR] = parseInt (entrée, 10);
    });

    // AIDES

    function daysInYear (year) {
        return isLeapYear (année)? 366: 365;
    }

    // CROCHETS

    hooks.parseTwoDigitYear = function (entrée) {
        return toInt (entrée) + (toInt (entrée)> 68? 1900: 2000);
    };

    // DES MOMENTS

    var getSetYear = makeGetSet ('FullYear', vrai);

    function getIsLeapYear () {
        return isLeapYear (this.year ());
    }

    function createDate (y, m, d, h, M, s, ms) {
        // ne peut pas simplement appliquer () pour créer une date:
        // https://stackoverflow.com/q/181348
        var date;
        // le constructeur de date remappe les années 0-99 à 1900-1999
        si (y <100 && y> = 0) {
            // préserve les années bissextiles en utilisant un cycle complet de 400 ans, puis réinitialise
            date = nouvelle date (a + 400, m, j, h, M, s, ms);
            if (isFinite (date.getFullYear ())) {
                date.setFullYear (y);
            }
        } autre {
            date = nouvelle Date (a, m, j, h, M, s, ms);
        }

        date de retour;
    }

    function createUTCDate (y) {
        var date, args;
        // la fonction Date.UTC remappe les années 0-99 à 1900-1999
        si (y <100 && y> = 0) {
            args = Array.prototype.slice.call (arguments);
            // préserve les années bissextiles en utilisant un cycle complet de 400 ans, puis réinitialise
            args [0] = y + 400;
            date = new Date (Date.UTC.apply (null, args));
            if (isFinite (date.getUTCFullYear ())) {
                date.setUTCFullYear (y);
            }
        } autre {
            date = new Date (Date.UTC.apply (null, arguments));
        }

        date de retour;
    }

    // début de la première semaine - début de l'année
    function firstWeekOffset (year, dow, doy) {
        var // premier jour de la semaine - qui janvier est toujours dans la première semaine (4 pour iso, 1 pour autre)
            fwd = 7 + dow - doy,
            // jour de la première semaine de la semaine locale - quel jour de la semaine local est fwd
            fwdlw = (7 + createUTCDate (année, 0, avant) .getUTCDay () - dow)% 7;

        retourne -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks (année, semaine, jour de la semaine, dow, doy) {
        var localWeekday = (7 + jour de la semaine - dow)% 7,
            weekOffset = firstWeekOffset (année, dow, doy),
            dayOfYear = 1 + 7 * (semaine - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = année - 1;
            resDayOfYear = daysInYear (resYear) + dayOfYear;
        } else if (dayOfYear> daysInYear (year)) {
            resYear = année + 1;
            resDayOfYear = dayOfYear - daysInYear (année);
        } autre {
            resYear = année;
            resDayOfYear = dayOfYear;
        }

        revenir {
            année: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear (maman, dow, doy) {
        var weekOffset = firstWeekOffset (mom.year (), dow, doy),
            week = Math.floor ((mom.dayOfYear () - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (semaine <1) {
            resYear = mom.year () - 1;
            resWeek = semaine + semaines en année (resYear, dow, doy);
        } else if (semaine> semaines en année (mom.year (), dow, doy)) {
            resWeek = semaine - semaines en année (mom.year (), dow, doy);
            resYear = maman.year () + 1;
        } autre {
            resYear = maman.year ();
            resWeek = semaine;
        }

        revenir {
            semaine: resWeek,
            année: resYear,
        };
    }

    function weeksInYear (year, dow, doy) {
        var weekOffset = firstWeekOffset (année, dow, doy),
            weekOffsetNext = firstWeekOffset (année + 1, dow, doy);
        return (daysInYear (year) - weekOffset + weekOffsetNext) / 7;
    }

    // MISE EN PAGE

    addFormatToken ('w', ['ww', 2], 'wo', 'semaine');
    addFormatToken ('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias ​​('semaine', 'w');
    addUnitAlias ​​('isoWeek', 'W');

    // PRIORITÉS

    addUnitPriority ('semaine', 5);
    addUnitPriority ('isoWeek', 5);

    // PARSING

    addRegexToken ('w', match1to2);
    addRegexToken ('ww', match1to2, match2);
    addRegexToken ('W', match1to2);
    addRegexToken ('WW', match1to2, match2);

    addWeekParseToken (['w', 'ww', 'W', 'WW'], fonction (
        saisir,
        semaine,
        config,
        jeton
    ) {
        semaine [token.substr (0, 1)] = toInt (entrée);
    });

    // AIDES

    // LOCALES

    function localeWeek (maman) {
        return weekOfYear (maman, this._week.dow, this.week.doy) .week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Le dimanche est le premier jour de la semaine.
        doy: 6, // La semaine qui contient le 6 janvier est la première semaine de l'année.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        retourne this._week.doy;
    }

    // DES MOMENTS

    function getSetWeek (entrée) {
        var semaine = this.localeData (). week (this);
        retourne l'entrée == null? semaine: this.add ((entrée - semaine) * 7, 'd');
    }

    function getSetISOWeek (entrée) {
        var week = weekOfYear (this, 1, 4) .week;
        retourne l'entrée == null? semaine: this.add ((entrée - semaine) * 7, 'd');
    }

    // MISE EN PAGE

    addFormatToken ('d', 0, 'faire', 'jour');

    addFormatToken ('dd', 0, 0, fonction (format) {
        return this.localeData (). weekdaysMin (this, format);
    });

    addFormatToken ('ddd', 0, 0, fonction (format) {
        return this.localeData (). weekdaysShort (this, format);
    });

    addFormatToken ('dddd', 0, 0, fonction (format) {
        return this.localeData (). weekdays (this, format);
    });

    addFormatToken ('e', 0, 0, 'jour de la semaine');
    addFormatToken ('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias ​​('jour', 'd');
    addUnitAlias ​​('jour de la semaine', 'e');
    addUnitAlias ​​('isoWeekday', 'E');

    // PRIORITÉ
    addUnitPriority ('jour', 11);
    addUnitPriority ('jour de la semaine', 11);
    addUnitPriority ('isoWeekday', 11);

    // PARSING

    addRegexToken ('d', match1to2);
    addRegexToken ('e', match1to2);
    addRegexToken ('E', match1to2);
    addRegexToken ('dd', function (isStrict, locale) {
        retourne locale.weekdaysMinRegex (isStrict);
    });
    addRegexToken ('ddd', function (isStrict, locale) {
        retourne locale.weekdaysShortRegex (isStrict);
    });
    addRegexToken ('dddd', function (isStrict, locale) {
        retourne locale.weekdaysRegex (isStrict);
    });

    addWeekParseToken (['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var jour de la semaine = config._locale.weekdaysParse (entrée, jeton, config._strict);
        // si nous n'avons pas obtenu de nom de jour de semaine, marquez la date comme invalide
        if (jour de la semaine! = null) {
            week.d = jour de la semaine;
        } autre {
            getParsingFlags (config) .invalidWeekday = entrée;
        }
    });

    addWeekParseToken (['d', 'e', ​​'E'], function (input, week, config, token) {
        semaine [jeton] = toInt (entrée);
    });

    // AIDES

    function parseWeekday (entrée, paramètres régionaux) {
        if (typeof input! == 'string') {
            entrée de retour;
        }

        if (! isNaN (entrée)) {
            return parseInt (entrée, 10);
        }

        input = locale.weekdaysParse (entrée);
        if (typeof input === 'number') {
            entrée de retour;
        }

        return null;
    }

    function parseIsoWeekday (entrée, paramètres régionaux) {
        if (typeof input === 'string') {
            retourne locale.weekdaysParse (entrée)% 7 || 7;
        }
        retour isNaN (entrée)? null: entrée;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        retourne ws.slice (n, 7) .concat (ws.slice (0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split (
            «_»
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split (' _ '),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split (' _ '),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays (m, format) {
        var weekdays = isArray (this._weekdays)
            ? this._weekdays
            : this._weekdays [
                  m && m! == true && this._weekdays.isFormat.test (format)
                      ? 'format'
                      : 'autonome'
              ];
        retourne m === vrai
            ? shiftWeekdays (jours de la semaine, this._week.dow)
            : m
            ? jours de la semaine [m.day ()]
            : jours de la semaine;
    }

    function localeWeekdaysShort (m) {
        retourne m === vrai
            ? shiftWeekdays (this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort [m.day ()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin (m) {
        retourne m === vrai
            ? shiftWeekdays (this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin [m.day ()]
            : this._weekdaysMin;
    }

    function handleStrictParse $ 1 (nom de la semaine, format, strict) {
        var i,
            ii,
            maman,
            llc = nom de la semaine.toLocaleLowerCase ();
        if (! this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            pour (i = 0; i <7; ++ i) {
                maman = créerUTC ([2000, 1]). jour (i);
                this._minWeekdaysParse [i] = this.weekdaysMin (
                    maman,
                    ''
                ) .toLocaleLowerCase ();
                this._shortWeekdaysParse [i] = this.weekdaysShort (
                    maman,
                    ''
                ) .toLocaleLowerCase ();
                this._weekdaysParse [i] = this.weekdays (maman, '') .toLocaleLowerCase ();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call (this._weekdaysParse, llc);
                retourne ii! == -1? ii: nul;
            } else if (format === 'ddd') {
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                retourne ii! == -1? ii: nul;
            } autre {
                ii = indexOf.call (this._minWeekdaysParse, llc);
                retourne ii! == -1? ii: nul;
            }
        } autre {
            if (format === 'dddd') {
                ii = indexOf.call (this._weekdaysParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._minWeekdaysParse, llc);
                retourne ii! == -1? ii: nul;
            } else if (format === 'ddd') {
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._weekdaysParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._minWeekdaysParse, llc);
                retourne ii! == -1? ii: nul;
            } autre {
                ii = indexOf.call (this._minWeekdaysParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._weekdaysParse, llc);
                si (ii! == -1) {
                    retour ii;
                }
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                retourne ii! == -1? ii: nul;
            }
        }
    }

    function localeWeekdaysParse (nom de la semaine, format, strict) {
        var i, maman, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse $ 1.call (this, nom de la semaine, format, strict);
        }

        if (! this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        pour (i = 0; i <7; i ++) {
            // créer le regex si nous ne l'avons pas déjà

            maman = créerUTC ([2000, 1]). jour (i);
            if (strict &&! this._fullWeekdaysParse [i]) {
                this._fullWeekdaysParse [i] = nouveau RegExp (
                    '^' + this.weekdays (maman, '') .replace ('.', '\\.?') + '$',
                    'je'
                );
                this._shortWeekdaysParse [i] = nouveau RegExp (
                    '^' + this.weekdaysShort (maman, '') .replace ('.', '\\.?') + '$',
                    'je'
                );
                this._minWeekdaysParse [i] = nouveau RegExp (
                    '^' + this.weekdaysMin (maman, '') .replace ('.', '\\.?') + '$',
                    'je'
                );
            }
            if (! this._weekdaysParse [i]) {
                regex =
                    «^» +
                    this.weekdays (maman, '') +
                    '| ^' +
                    this.weekdaysShort (maman, ``) +
                    '| ^' +
                    this.weekdaysMin (maman, '');
                this._weekdaysParse [i] = new RegExp (regex.replace ('.', ''), 'i');
            }
            // teste l'expression régulière
            si (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse [i] .test (nom de la semaine)
            ) {
                return i;
            } sinon si (
                strict &&
                format === 'jjj' &&
                this._shortWeekdaysParse [i] .test (nom de la semaine)
            ) {
                return i;
            } sinon si (
                strict &&
                format === 'jj' &&
                this._minWeekdaysParse [i] .test (nom de la semaine)
            ) {
                return i;
            } else if (! strict && this._weekdaysParse [i] .test (nom de la semaine)) {
                return i;
            }
        }
    }

    // DES MOMENTS

    function getSetDayOfWeek (entrée) {
        if (! this.isValid ()) {
            retourne l'entrée! = null? ceci: NaN;
        }
        var day = this._isUTC? this._d.getUTCDay (): this._d.getDay ();
        if (entrée! = null) {
            input = parseWeekday (entrée, this.localeData ());
            return this.add (entrée - jour, 'd');
        } autre {
            jour de retour;
        }
    }

    function getSetLocaleDayOfWeek (entrée) {
        if (! this.isValid ()) {
            retourne l'entrée! = null? ceci: NaN;
        }
        var jour de la semaine = (this.day () + 7 - this.localeData () ._ week.dow)% 7;
        retourne l'entrée == null? jour de la semaine: this.add (entrée - jour de la semaine, 'd');
    }

    function getSetISODayOfWeek (entrée) {
        if (! this.isValid ()) {
            retourne l'entrée! = null? ceci: NaN;
        }

        // se comporte comme le moment # jour sauf
        // en tant que getter, renvoie 7 au lieu de 0 (plage de 1 à 7 au lieu de 0 à 6)
        // en tant que passeur, le dimanche devrait appartenir à la semaine précédente.

        if (entrée! = null) {
            var jour de semaine = parseIsoWeekday (entrée, this.localeData ());
            return this.day (this.day ()% 7? jour de la semaine: jour de la semaine - 7);
        } autre {
            retourner ce.jour () || 7;
        }
    }

    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                computeWeekdaysParse.call (this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } autre {
                return this._weekdaysRegex;
            }
        } autre {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            renvoyer this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                computeWeekdaysParse.call (this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } autre {
                return this._weekdaysShortRegex;
            }
        } autre {
            if (! hasOwnProp (this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            renvoie this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                computeWeekdaysParse.call (this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } autre {
                return this._weekdaysMinRegex;
            }
        } autre {
            if (! hasOwnProp (this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            renvoie this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse () {
        function cmpLenRev (a, b) {
            retour b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            je,
            maman,
            minp,
            shortp,
            longp;
        pour (i = 0; i <7; i ++) {
            // créer le regex si nous ne l'avons pas déjà
            maman = créerUTC ([2000, 1]). jour (i);
            minp = regexEscape (this.weekdaysMin (maman, ''));
            shortp = regexEscape (this.weekdaysShort (maman, ''));
            longp = regexEscape (this.weekdays (maman, ''));
            minPieces.push (minp);
            shortPieces.push (shortp);
            longPieces.push (longp);
            mixedPieces.push (minp);
            mixedPieces.push (shortp);
            mixedPieces.push (longp);
        }
        // Le tri permet de s'assurer qu'un jour de la semaine (ou abbr) est le préfixe d'un autre
        // correspondra à la pièce la plus longue.
        minPieces.sort (cmpLenRev);
        shortPieces.sort (cmpLenRev);
        longPieces.sort (cmpLenRev);
        mixedPieces.sort (cmpLenRev);

        this._weekdaysRegex = new RegExp ('^ (' + mixedPieces.join ('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = nouveau RegExp (
            '^ (' + longPieces.join ('|') + ')',
            'je'
        );
        this._weekdaysShortStrictRegex = nouveau RegExp (
            '^ (' + shortPieces.join ('|') + ')',
            'je'
        );
        this._weekdaysMinStrictRegex = nouveau RegExp (
            '^ (' + minPieces.join ('|') + ')',
            'je'
        );
    }

    // MISE EN PAGE

    function hFormat () {
        renvoyer this.hours ()% 12 || 12;
    }

    function kFormat () {
        retourne this.hours () || 24;
    }

    addFormatToken ('H', ['HH', 2], 0, 'heure');
    addFormatToken ('h', ['hh', 2], 0, hFormat);
    addFormatToken ('k', ['kk', 2], 0, kFormat);

    addFormatToken ('hmm', 0, 0, fonction () {
        return '' + hFormat.apply (this) + zeroFill (this.minutes (), 2);
    });

    addFormatToken ('hmmss', 0, 0, fonction () {
        revenir (
            '' +
            hFormat.apply (ceci) +
            zeroFill (this.minutes (), 2) +
            zeroFill (this.seconds (), 2)
        );
    });

    addFormatToken ('Hmm', 0, 0, fonction () {
        return '' + this.hours () + zeroFill (this.minutes (), 2);
    });

    addFormatToken ('Hmmss', 0, 0, fonction () {
        revenir (
            '' +
            this.hours () +
            zeroFill (this.minutes (), 2) +
            zeroFill (this.seconds (), 2)
        );
    });

    function meridiem (jeton, minuscule) {
        addFormatToken (jeton, 0, 0, fonction () {
            renvoie this.localeData (). meridiem (
                this.hours (),
                this.minutes (),
                minuscule
            );
        });
    }

    meridiem ('a', vrai);
    meridiem ('A', faux);

    // ALIASES

    addUnitAlias ​​('heure', 'h');

    // PRIORITÉ
    addUnitPriority ('heure', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken ('a', matchMeridiem);
    addRegexToken ('A', matchMeridiem);
    addRegexToken ('H', match1to2);
    addRegexToken ('h', match1to2);
    addRegexToken ('k', match1to2);
    addRegexToken ('HH', match1to2, match2);
    addRegexToken ('hh', match1to2, match2);
    addRegexToken ('kk', match1to2, match2);

    addRegexToken ('hmm', match3to4);
    addRegexToken ('hmmss', match5to6);
    addRegexToken ('Hmm', match3to4);
    addRegexToken ('Hmmss', match5to6);

    addParseToken (['H', 'HH'], HEURE);
    addParseToken (['k', 'kk'], function (input, array, config) {
        var kInput = toInt (entrée);
        tableau [HOUR] = kInput === 24? 0: kInput;
    });
    addParseToken (['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM (entrée);
        config._meridiem = entrée;
    });
    addParseToken (['h', 'hh'], function (input, array, config) {
        array [HOUR] = toInt (entrée);
        getParsingFlags (config) .bigHour = true;
    });
    addParseToken ('hmm', fonction (entrée, tableau, configuration) {
        var pos = longueur d'entrée - 2;
        array [HOUR] = toInt (input.substr (0, pos));
        array [MINUTE] = toInt (input.substr (pos));
        getParsingFlags (config) .bigHour = true;
    });
    addParseToken ('hmmss', fonction (entrée, tableau, configuration) {
        var pos1 = longueur d'entrée - 4,
            pos2 = longueur d'entrée - 2;
        array [HOUR] = toInt (input.substr (0, pos1));
        array [MINUTE] = toInt (input.substr (pos1, 2));
        array [SECOND] = toInt (input.substr (pos2));
        getParsingFlags (config) .bigHour = true;
    });
    addParseToken ('Hmm', fonction (entrée, tableau, configuration) {
        var pos = longueur d'entrée - 2;
        array [HOUR] = toInt (input.substr (0, pos));
        array [MINUTE] = toInt (input.substr (pos));
    });
    addParseToken ('Hmmss', fonction (entrée, tableau, configuration) {
        var pos1 = longueur d'entrée - 4,
            pos2 = longueur d'entrée - 2;
        array [HOUR] = toInt (input.substr (0, pos1));
        array [MINUTE] = toInt (input.substr (pos1, 2));
        array [SECOND] = toInt (input.substr (pos2));
    });

    // LOCALES

    function localeIsPM (entrée) {
        // Le mode Quirks IE8 et le mode Standards IE7 ne permettent pas d'accéder aux chaînes comme les tableaux
        // L'utilisation de charAt devrait être plus compatible.
        return (entrée + '') .toLowerCase (). charAt (0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap </font>\.?m?\.?/i,
        // Le réglage de l'heure doit conserver l'heure, car l'utilisateur explicitement
        // a spécifié quelle heure ils voulaient. Donc, en essayant de maintenir la même heure (en
        // un nouveau fuseau horaire) a du sens. L'ajout / la soustraction d'heures ne suit pas
        // cette règle.
        getSetHour = makeGetSet ('Heures', vrai);

    function localeMeridiem (heures, minutes, isLower) {
        if (heures> 11) {
            retour isLower? «pm»: «PM»;
        } autre {
            retour isLower? «suis»: «AM»;
        }
    }

    var baseConfig = {
        calendrier: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        mois: defaultLocaleMonths,
        moisShort: defaultLocaleMonthsShort,

        semaine: defaultLocaleWeek,

        jours de la semaine: defaultLocaleWeekdays,
        jours de la semaineMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // stockage interne pour les fichiers de configuration des paramètres régionaux
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix (arr1, arr2) {
        var i,
            minl = Math.min (arr1.length, arr2.length);
        pour (i = 0; i <minl; i + = 1) {
            si (arr1 [i]! == arr2 [i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale (clé) {
        clé de retour? key.toLowerCase (). replace ('_', '-'): clé;
    }

    // choisissez la locale dans le tableau
    // essayez ['en-au', 'en-gb'] comme 'en-au', 'en-gb', 'en', comme dans se déplacer dans la liste en essayant chaque
    // sous-chaîne du plus spécifique au moins, mais passe à l'élément de tableau suivant s'il s'agit d'une variante plus spécifique que la racine actuelle
    function chooseLocale (noms) {
        var i = 0,
            j,
            suivant,
            lieu,
            diviser;

        while (i <names.length) {
            split = normalizeLocale (noms [i]). split ('-');
            j = split.length;
            next = normalizeLocale (noms [i + 1]);
            suivant = suivant? next.split ('-'): null;
            tandis que (j> 0) {
                locale = loadLocale (split.slice (0, j) .join ('-'));
                if (locale) {
                    return locale;
                }
                si (
                    suivant &&
                    next.length> = j &&
                    commonPrefix (split, next)> = j - 1
                ) {
                    // l'élément suivant du tableau est meilleur qu'une sous-chaîne moins profonde de celui-ci
                    Pause;
                }
                j--;
            }
            i ++;
        }
        return globalLocale;
    }

    function loadLocale (nom) {
        var oldLocale = null,
            aliasRequire;
        // TODO: Trouvez une meilleure façon d'enregistrer et de charger toutes les locales dans Node
        si (
            locales [nom] === indéfini &&
            typeof module! == 'indéfini' &&
            module &&
            module.exports
        ) {
            essayer {
                oldLocale = globalLocale._abbr;
                aliasRequire = exiger;
                aliasRequire ('./ locale /' + nom);
                getSetGlobalLocale (oldLocale);
            } catch (e) {
                // marquer comme introuvable pour éviter de répéter un fichier coûteux nécessite un appel entraînant un processeur élevé
                // en essayant de trouver en-US, en_US, en-us pour chaque appel de format
                locales [nom] = null; // null signifie introuvable
            }
        }
        return locales [nom];
    }

    // Cette fonction chargera les paramètres régionaux, puis définira les paramètres régionaux globaux. Si
    // aucun argument n'est passé, il retournera simplement le global courant
    // clé locale.
    function getSetGlobalLocale (clé, valeurs) {
        var data;
        if (clé) {
            if (isUndefined (valeurs)) {
                data = getLocale (clé);
            } autre {
                data = defineLocale (clé, valeurs);
            }

            if (données) {
                // moment.duration._locale = moment._locale = données;
                globalLocale = données;
            } autre {
                if (typeof console! == 'undefined' && console.warn) {
                    // avertit l'utilisateur si des arguments sont passés mais que les paramètres régionaux n'ont pas pu être définis
                    console.warn (
                        'Locale' + touche + 'introuvable. Avez-vous oublié de le charger?
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (nom, config) {
        if (config! == null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = nom;
            if (paramètres régionaux [nom]! = null) {
                deprecateSimple (
                    'defineLocaleOverride',
                    'utilisez moment.updateLocale (localeName, config) pour changer' +
                        'une locale existante. moment.defineLocale (localeName, '+
                        'config) ne doit être utilisé que pour créer une nouvelle locale' +
                        'Voir http://momentjs.com/guides/#/warnings/define-locale/ pour plus d'informations.'
                );
                parentConfig = locales [nom] ._ config;
            } else if (config.parentLocale! = null) {
                if (locales [config.parentLocale]! = null) {
                    parentConfig = locales [config.parentLocale] ._ config;
                } autre {
                    locale = loadLocale (config.parentLocale);
                    if (locale! = null) {
                        parentConfig = locale._config;
                    } autre {
                        if (! localeFamilies [config.parentLocale]) {
                            localeFamilies [config.parentLocale] = [];
                        }
                        localeFamilies [config.parentLocale] .push ({
                            nom nom,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales [nom] = nouvelle locale (mergeConfigs (parentConfig, config));

            if (localeFamilies [nom]) {
                localeFamilies [nom] .forEach (fonction (x) {
                    defineLocale (x.name, x.config);
                });
            }

            // rétrocompatibilité pour l'instant: définit également la locale
            // assurez-vous que nous définissons les paramètres régionaux APRÈS que tous les paramètres régionaux enfants aient été
            // créé, donc nous ne finirons pas avec le jeu de paramètres régionaux enfant.
            getSetGlobalLocale (nom);

            return locales [nom];
        } autre {
            // utile pour tester
            supprimer les paramètres régionaux [nom];
            return null;
        }
    }

    function updateLocale (nom, configuration) {
        if (config! = null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales [nom]! = null && locales [nom] .parentLocale! = null) {
                // Mettre à jour les paramètres régionaux enfants existants pour éviter les fuites de mémoire
                locales [nom] .set (mergeConfigs (locales [nom] ._ config, config));
            } autre {
                // FUSION
                tmpLocale = loadLocale (nom);
                if (tmpLocale! = null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs (parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale est appelé pour créer une nouvelle locale
                    // Définit abbr pour qu'il ait un nom (les getters retournent
                    // non défini dans le cas contraire).
                    config.abbr = nom;
                }
                locale = nouvelle locale (config);
                locale.parentLocale = locales [nom];
                locales [nom] = locale;
            }

            // rétrocompatibilité pour l'instant: définit également la locale
            getSetGlobalLocale (nom);
        } autre {
            // passe null pour que la configuration soit annulée, utile pour les tests
            if (paramètres régionaux [nom]! = null) {
                if (locales [nom] .parentLocale! = null) {
                    locales [nom] = locales [nom] .parentLocale;
                    if (nom === getSetGlobalLocale ()) {
                        getSetGlobalLocale (nom);
                    }
                } else if (locales [nom]! = null) {
                    supprimer les paramètres régionaux [nom];
                }
            }
        }
        return locales [nom];
    }

    // renvoie les données locales
    function getLocale (clé) {
        var locale;

        if (clé && clé._locale && clé._locale._abbr) {
            clé = clé._locale._abbr;
        }

        if (! clé) {
            return globalLocale;
        }

        if (! isArray (clé)) {
            // court-circuite tout le reste
            locale = loadLocale (clé);
            if (locale) {
                return locale;
            }
            clé = [clé];
        }

        return chooseLocale (clé);
    }

    function listLocales () {
        clés de retour (locales);
    }

    fonction checkOverflow (m) {
        débordement var,
            a = m._a;

        if (a && getParsingFlags (m) .overflow === -2) {
            débordement =
                a [MOIS] <0 || a [MOIS]> 11
                    ? MOIS
                    : a [DATE] <1 || a [DATE]> daysInMonth (a [YEAR], a [MONTH])
                    ? DATE
                    : a [HEURE] <0 ||
                      a [HEURE]> 24 ||
                      (a [HOUR] === 24 &&
                          (a [MINUTE]! == 0 ||
                              a [SECONDE]! == 0 ||
                              a [MILLISECOND]! == 0))
                    ? HEURE
                    : a [MINUTE] <0 || a [MINUTE]> 59
                    ? MINUTE
                    : a [SECOND] <0 || a [SECOND]> 59
                    ? DEUXIÈME
                    : a [MILLISECOND] <0 || a [MILLISECOND]> 999
                    ? MILLISECOND
                    : -1;

            si (
                getParsingFlags (m) ._ overflowDayOfYear &&
                (débordement <ANNEE || débordement> DATE)
            ) {
                débordement = DATE;
            }
            if (getParsingFlags (m) ._ overflowWeeks && overflow === -1) {
                débordement = SEMAINE;
            }
            if (getParsingFlags (m) ._ overflowWeekday && overflow === -1) {
                débordement = WEEKDAY;
            }

            getParsingFlags (m) .overflow = débordement;
        }

        return m;
    }

    // expression régulière ISO 8601
    // 0000-00-00 0000-W00 ou 0000-W00-0 + T + 00 ou 00:00 ou 00:00:00 ou 00: 00: 00.000 + +00: 00 ou +0000 ou +00)
    var extendedIsoRegex = / ^ \ s * ((?: [+ -] \ d {6} | \ d {4}) - (?: \ d \ d- \ d \ d | W \ d \ d- \ d | W \ d \ d | \ d \ d \ d | \ d \ d)) (? :( T |) (\ d \ d (? :: \ d \ d (? :: \ d \ d (? : [.,] \ d +)?)?)?) ([+ -] \ d \ d (? ::? \ d \ d)? | \ s * Z)?)? $ /,
        basicIsoRegex = / ^ \ s * ((?: [+ -] \ d {6} | \ d {4}) (?: \ d \ d \ d \ d | W \ d \ d \ d | W \ d \ d | \ d \ d \ d | \ d \ d |)) (? :( T |) (\ d \ d (?: \ d \ d (?: \ d \ d (?: [.,] \ d +)?)?)?) ([+ -] \ d \ d (? ::? \ d \ d)? | \ s * Z)?)? $ /,
        tzRegex = / Z | [+ -] \ d \ d (? ::? \ d \ d)? /,
        isoDates = [
            ['AAAAAA-MM-JJ', / [+ -] \ d {6} - \ d \ d- \ d \ d /],
            ['AAAA-MM-JJ', / \ d {4} - \ d \ d- \ d \ d /],
            ['GGGG- [W] WW-E', / \ d {4} -W \ d \ d- \ d /],
            ['GGGG- [W] WW', / \ d {4} -W \ d \ d /, false],
            ['AAAA-JJJ', / \ d {4} - \ d {3} /],
            ['AAAA-MM', / \ d {4} - \ d \ d /, faux],
            ['AAAAAAMMJJ', / [+ -] \ d {10} /],
            ['AAAAMMJJ', / \ d {8} /],
            ['GGGG [W] WWE', / \ d {4} W \ d {3} /],
            ['GGGG [W] WW', / \ d {4} W \ d {2} /, false],
            ['YYYYDDD', / \ d {7} /],
            ['AAAAMM', / \ d {6} /, faux],
            ['YYYY', / \ d {4} /, false],
        ],
        // formats d'heure iso et expressions rationnelles
        isoTimes = [
            ['HH: mm: ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH: mm: ss, SSSS', / \ d \ d: \ d \ d: \ d \ d, \ d + /],
            ['HH: mm: ss', / \ d \ d: \ d \ d: \ d \ d /],
            ['HH: mm', / \ d \ d: \ d \ d /],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss, SSSS', / \ d \ d \ d \ d \ d \ d, \ d + /],
            ['HHmmss', / \ d \ d \ d \ d \ d \ d /],
            ['HHmm', / \ d \ d \ d \ d /],
            ['HH', / \ d \ d /],
        ],
        aspNetJsonRegex = / ^ \ /? Date \ ((-? \ d +) / i,
        // RFC 2822 regex: pour plus de détails, voir https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = / ^ (? :( Lun | Mar | Mer | Jeu | Ven | Sam | Dim),? \ s)? (\ d {1,2}) \ s (Jan | Fév | Mar | Avr | Mai | Juin | juil. | Août | sept. | Oct. | Nov. | Déc.) \ S (\ d {2,4}) \ s (\ d \ d): (\ d \ d) (? :: (\ d \ d) )? \ s (? :( UT | GMT | [ECMP] [SD] T) | ([Zz]) | ([+ -] \ d {4})) $ /,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date du format iso
    function configFromISO (config) {
        var i,
            l,
            chaîne = config._i,
            match = extendedIsoRegex.exec (chaîne) || basicIsoRegex.exec (chaîne),
            laisser du temps,
            format de date,
            format de l'heure,
            tzFormat;

        if (match) {
            getParsingFlags (config) .iso = true;

            pour (i = 0, l = isoDates.length; i <l; i ++) {
                if (isoDates [i] [1] .exec (match [1])) {
                    dateFormat = isoDates [i] [0];
                    allowTime = isoDates [i] [2]! == false;
                    Pause;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                revenir;
            }
            if (match [3]) {
                pour (i = 0, l = isoTimes.length; i <l; i ++) {
                    if (isoTimes [i] [1] .exec (match [3])) {
                        // match [2] doit être 'T' ou espace
                        timeFormat = (match [2] || '') + isoTimes [i] [0];
                        Pause;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    revenir;
                }
            }
            if (! allowTime && timeFormat! = null) {
                config._isValid = false;
                revenir;
            }
            if (match [4]) {
                if (tzRegex.exec (correspondance [4])) {
                    tzFormat = 'Z';
                } autre {
                    config._isValid = false;
                    revenir;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat (config);
        } autre {
            config._isValid = false;
        }
    }

    extrait de fonctionFromRFC2822Strings (
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear (yearStr),
            defaultLocaleMonthsShort.indexOf (monthStr),
            parseInt (dayStr, 10),
            parseInt (hourStr, 10),
            parseInt (minuteStr, 10),
        ];

        if (secondStr) {
            result.push (parseInt (secondStr, 10));
        }

        résultat de retour;
    }

    function untruncateYear (yearStr) {
        var année = parseInt (yearStr, 10);
        if (année <= 49) {
            retour 2000 + an;
        } else if (année <= 999) {
            retour 1900 + an;
        }
        année de retour;
    }

    fonction preprocessRFC2822 (s) {
        // Supprime les commentaires et les espaces blancs de pliage et remplace les espaces multiples par un seul espace
        Retour
            .replace (/ \ ([^)] * \) | [\ n \ t] / g, '')
            .replace (/ (\ s \ s +) / g, '')
            .replace (/ ^ \ s \ s * /, '')
            .replace (/ \ s \ s * $ /, '');
    }

    function checkWeekday (weekStr, parsedInput, config) {
        if (weekStr) {
            // TODO: Remplacez l'objet Date JS vanille par une vérification indépendante du jour de la semaine.
            var weekProvided = defaultLocaleWeekdaysShort.indexOf (weekStr),
                weekActual = nouvelle date (
                    parsedInput [0],
                    parsedInput [1],
                    parsedInput [2]
                ) .getDay ();
            if (weekProvided! == weekActual) {
                getParsingFlags (config) .weekdayMismatch = true;
                config._isValid = false;
                retourne faux;
            }
        }
        retourne vrai;
    }

    function calculerOffset (obsOffset, MilitaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets [obsOffset];
        } else if (MilitaryOffset) {
            // le seul tz militaire autorisé est Z
            return 0;
        } autre {
            var hm = parseInt (numOffset, 10),
                m = hm% 100,
                h = (hm - m) / 100;
            retour h * 60 + m;
        }
    }

    // date et heure au format ref 2822
    function configFromRFC2822 (config) {
        var match = rfc2822.exec (preprocessRFC2822 (config._i)),
            parsedArray;
        if (match) {
            parsedArray = extraireFromRFC2822Strings (
                match [4],
                match [3],
                match [2],
                match [5],
                match [6],
                match [7]
            );
            if (! checkWeekday (match [1], parsedArray, config)) {
                revenir;
            }

            config._a = parsedArray;
            config._tzm = CalculateOffset (correspondance [8], correspondance [9], correspondance [10]);

            config._d = createUTCDate.apply (null, config._a);
            config._d.setUTCMinutes (config._d.getUTCMinutes () - config._tzm);

            getParsingFlags (config) .rfc2822 = true;
        } autre {
            config._isValid = false;
        }
    }

    // date de 1) ASP.NET, 2) ISO, 3) formats RFC 2822, ou 4) repli facultatif si l'analyse n'est pas stricte
    function configFromString (config) {
        var matched = aspNetJsonRegex.exec (config._i);
        if (apparié! == null) {
            config._d = nouvelle date (+ correspondance [1]);
            revenir;
        }

        configFromISO (config);
        if (config._isValid === false) {
            supprimer config._isValid;
        } autre {
            revenir;
        }

        configFromRFC2822 (config);
        if (config._isValid === false) {
            supprimer config._isValid;
        } autre {
            revenir;
        }

        if (config._strict) {
            config._isValid = false;
        } autre {
            // Dernière tentative, utilisez Input Fallback
            hooks.createFromInputFallback (config);
        }
    }

    hooks.createFromInputFallback = obsolète (
        La valeur fournie n'est pas dans un format RFC2822 ou ISO reconnu. la construction du moment revient à js Date (), '+
            'qui n'est pas fiable sur tous les navigateurs et toutes les versions. Les formats de date non RFC2822 / ISO sont '+
            'découragé. Veuillez consulter http://momentjs.com/guides/#/warnings/js-date/ pour plus d'informations. ',
        function (config) {
            config._d = nouvelle date (config._i + (config._useUTC? 'UTC': ''));
        }
    );

    // Choisissez le premier défini de deux ou trois arguments.
    les valeurs par défaut de la fonction (a, b, c) {
        if (a! = null) {
            return a;
        }
        if (b! = null) {
            retour b;
        }
        retour c;
    }

    function currentDateArray (config) {
        // hooks est en fait l'objet moment exporté
        var nowValue = nouvelle date (hooks.now ());
        if (config._useUTC) {
            revenir [
                nowValue.getUTCFullYear (),
                nowValue.getUTCMonth (),
                nowValue.getUTCDate (),
            ];
        }
        return [nowValue.getFullYear (), nowValue.getMonth (), nowValue.getDate ()];
    }

    // convertit un tableau en une date.
    // le tableau doit refléter les paramètres ci-dessous
    // note: toutes les valeurs après l'année sont facultatives et seront par défaut à la valeur la plus basse possible.
    // [année, mois, jour, heure, minute, seconde, milliseconde]
    function configFromArray (config) {
        var i,
            Date,
            entrée = [],
            date actuelle,
            prévuWeekday,
            yearToUse;

        if (config._d) {
            revenir;
        }

        currentDate = currentDateArray (config);

        // calculer le jour de l'année à partir des semaines et des jours de la semaine
        if (config._w && config._a [DATE] == null && config._a [MONTH] == null) {
            dayOfYearFromWeekInfo (config);
        }

        // si le jour de l'année est défini, déterminez ce que c'est
        if (config._dayOfYear! = null) {
            yearToUse = valeurs par défaut (config._a [YEAR], currentDate [YEAR]);

            si (
                config._dayOfYear> daysInYear (yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags (config) ._ overflowDayOfYear = true;
            }

            date = createUTCDate (yearToUse, 0, config._dayOfYear);
            config._a [MONTH] = date.getUTCMonth ();
            config._a [DATE] = date.getUTCDate ();
        }

        // Par défaut à la date actuelle.
        // * si aucune année, mois, jour du mois n'est indiqué, par défaut à aujourd'hui
        // * si le jour du mois est indiqué, le mois et l'année par défaut
        // * si le mois est donné, par défaut seulement l'année
        // * si l'année est donnée, ne rien par défaut
        pour (i = 0; i <3 && config._a [i] == null; ++ i) {
            config._a [i] = input [i] = currentDate [i];
        }

        // Mettre à zéro tout ce qui n'a pas été défini par défaut, y compris l'heure
        pour (; i <7; i ++) {
            config._a [i] = entrée [i] =
                config._a [i] == null? (i === 2? 1: 0): config._a [i];
        }

        // Chèque pour 24: 00: 00.000
        si (
            config._a [HOUR] === 24 &&
            config._a [MINUTE] === 0 &&
            config._a [SECOND] === 0 &&
            config._a [MILLISECOND] === 0
        ) {
            config._nextDay = vrai;
            config._a [HEURE] = 0;
        }

        config._d = (config._useUTC? createUTCDate: createDate) .apply (
            nul,
            saisir
        );
        attenduWeekday = config._useUTC
            ? config._d.getUTCDay ()
            : config._d.getDay ();

        // Appliquer le décalage du fuseau horaire à partir de l'entrée. L'utcOffset réel peut être modifié
        // avec parseZone.
        if (config._tzm! = null) {
            config._d.setUTCMinutes (config._d.getUTCMinutes () - config._tzm);
        }

        if (config._nextDay) {
            config._a [HEURE] = 24;
        }

        // vérifier si le jour de la semaine ne correspond pas
        si (
            config._w &&
            typeof config._w.d! == 'indéfini' &&
            config._w.d! == attenduWeekday
        ) {
            getParsingFlags (config) .weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo (config) {
        var w, weekYear, week, jour de la semaine, dow, doy, temp, dayOverflow, curWeek;

        w = config._w;
        si (w.GG! = nul || wW! = nul || wE! = nul) {
            dow = 1;
            doy = 4;

            // TODO: Nous devons prendre l'isoWeekYear actuelle, mais cela dépend de
            // comment nous interprétons maintenant (local, utc, offset fixe). Alors créez
            // une version now de la configuration actuelle (prenez les indicateurs local / utc / offset, et
            // créer maintenant).
            weekYear = valeurs par défaut (
                w.GG,
                config._a [YEAR],
                weekOfYear (createLocal (), 1, 4) .year
            );
            semaine = valeurs par défaut (wW, 1);
            jour de la semaine = valeurs par défaut (wE, 1);
            if (jour de la semaine <1 || jour de la semaine> 7) {
                dayOverflow = vrai;
            }
        } autre {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear (createLocal (), dow, doy);

            weekYear = valeurs par défaut (w.gg, config._a [YEAR], curWeek.year);

            // Par défaut sur la semaine en cours.
            semaine = valeurs par défaut (ww, curWeek.week);

            if (wd! = null) {
                // jour de la semaine - les nombres de jours faibles sont pris en compte la semaine prochaine
                jour de la semaine = wd;
                if (jour de la semaine <0 || jour de la semaine> 6) {
                    dayOverflow = vrai;
                }
            } else if (nous! = null) {
                // jour de la semaine local - le comptage commence à partir du début de la semaine
                jour de la semaine = nous + dow;
                si (nous <0 || nous> 6) {
                    dayOverflow = vrai;
                }
            } autre {
                // par défaut au début de la semaine
                jour de la semaine = dow;
            }
        }
        if (semaine <1 || semaine> semaines en année (semaine année, dow, doy)) {
            getParsingFlags (config) ._ overflowWeeks = true;
        } else if (dayOverflow! = null) {
            getParsingFlags (config) ._ overflowWeekday = true;
        } autre {
            temp = dayOfYearFromWeeks (weekYear, semaine, jour de la semaine, dow, doy);
            config._a [YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constante qui fait référence à la norme ISO
    hooks.ISO_8601 = fonction () {};

    // constante qui fait référence au formulaire RFC 2822
    hooks.RFC_2822 = fonction () {};

    // date de la chaîne et chaîne de format
    function configFromStringAndFormat (config) {
        // TODO: déplacez-le vers une autre partie du flux de création pour éviter les dépressions circulaires
        if (config._f === hooks.ISO_8601) {
            configFromISO (config);
            revenir;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822 (config);
            revenir;
        }
        config._a = [];
        getParsingFlags (config) .empty = true;

        // Ce tableau est utilisé pour créer une date, soit avec `new Date`, soit avec` Date.UTC`
        var string = '' + config._i,
            je,
            parsedInput,
            jetons,
            jeton,
            ignoré,
            stringLength = string.length,
            totalParsedInputLength = 0,
            ère;

        jetons =
            expandFormat (config._f, config._locale) .match (formattingTokens) || [];

        pour (i = 0; i <tokens.length; i ++) {
            jeton = jetons [i];
            parsedInput = (string.match (getParseRegexForToken (jeton, configuration)) ||
                []) [0];
            if (parsedInput) {
                skipped = string.substr (0, string.indexOf (parsedInput));
                if (skipped.length> 0) {
                    getParsingFlags (config) .unusedInput.push (ignoré);
                }
                chaîne = chaîne.slice (
                    string.indexOf (parsedInput) + parsedInput.length
                );
                totalParsedInputLength + = parsedInput.length;
            }
            // ne pas analyser si ce n'est pas un jeton connu
            if (formatTokenFunctions [jeton]) {
                if (parsedInput) {
                    getParsingFlags (config) .empty = false;
                } autre {
                    getParsingFlags (config) .unusedTokens.push (jeton);
                }
                addTimeToArrayFromToken (jeton, parsedInput, config);
            } else if (config._strict &&! parsedInput) {
                getParsingFlags (config) .unusedTokens.push (jeton);
            }
        }

        // ajoute la longueur d'entrée non analysée restante à la chaîne
        getParsingFlags (config) .charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length> 0) {
            getParsingFlags (config) .unusedInput.push (chaîne);
        }

        // efface l'indicateur _12h si l'heure est <= 12
        si (
            config._a [HOUR] <= 12 &&
            getParsingFlags (config) .bigHour === true &&
            config._a [HOUR]> 0
        ) {
            getParsingFlags (config) .bigHour = undefined;
        }

        getParsingFlags (config) .parsedDateParts = config._a.slice (0);
        getParsingFlags (config) .meridiem = config._meridiem;
        // gérer le meridiem
        config._a [HOUR] = meridiemFixWrap (
            config._locale,
            config._a [HOUR],
            config._meridiem
        );

        // gérer l'ère
        era = getParsingFlags (config) .era;
        if (ère! == null) {
            config._a [YEAR] = config._locale.erasConvertYear (ère, config._a [YEAR]);
        }

        configFromArray (config);
        checkOverflow (config);
    }

    function meridiemFixWrap (locale, heure, meridiem) {
        var isPm;

        if (meridiem == null) {
            // rien à faire
            heure de retour;
        }
        if (locale.meridiemHour! = null) {
            return locale.meridiemHour (heure, meridiem);
        } else if (locale.isPM! = null) {
            // Se retirer
            isPm = locale.isPM (meridiem);
            if (isPm && heure <12) {
                heure + = 12;
            }
            if (! isPm && heure === 12) {
                heure = 0;
            }
            heure de retour;
        } autre {
            // Ceci n'est pas censé se produire
            heure de retour;
        }
    }

    // date de la chaîne et tableau des chaînes de format
    function configFromStringAndArray (config) {
        var tempConfig,
            meilleur moment,
            scoreToBeat,
            je,
            score actuel,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags (config) .invalidFormat = true;
            config._d = nouvelle date (NaN);
            revenir;
        }

        pour (i = 0; i <config._f.length; i ++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig ({}, config);
            if (config._useUTC! = null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f [i];
            configFromStringAndFormat (tempConfig);

            if (isValid (tempConfig)) {
                validFormatFound = true;
            }

            // s'il y a une entrée qui n'a pas été analysée ajouter une pénalité pour ce format
            currentScore + = getParsingFlags (tempConfig) .charsLeftOver;

            // ou jetons
            currentScore + = getParsingFlags (tempConfig) .unusedTokens.length * 10;

            getParsingFlags (tempConfig) .score = currentScore;

            if (! bestFormatIsValid) {
                si (
                    scoreToBeat == null ||
                    currentScore <scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } autre {
                if (currentScore <scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend (config, bestMoment || tempConfig);
    }

    function configFromObject (config) {
        if (config._d) {
            revenir;
        }

        var i = normalizeObjectUnits (config._i),
            dayOrDate = i.day === indéfini? i.date: i.day;
        config._a = carte (
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.seconde, i.milliseconde],
            fonction (obj) {
                return obj && parseInt (obj, 10);
            }
        );

        configFromArray (config);
    }

    function createFromConfig (config) {
        var res = nouveau moment (checkOverflow (prepareConfig (config)));
        if (res._nextDay) {
            // L'ajout est assez intelligent autour de l'heure d'été
            res.add (1, 'd');
            res._nextDay = indéfini;
        }

        return res;
    }

    function prepareConfig (config) {
        var entrée = config._i,
            format = config._f;

        config._locale = config._locale || getLocale (config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid ({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = entrée = config._locale.preparse (entrée);
        }

        if (isMoment (entrée)) {
            retourne un nouveau moment (checkOverflow (entrée));
        } else if (isDate (entrée)) {
            config._d = entrée;
        } else if (isArray (format)) {
            configFromStringAndArray (config);
        } else if (format) {
            configFromStringAndFormat (config);
        } autre {
            configFromInput (config);
        }

        if (! isValid (config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput (config) {
        var entrée = config._i;
        if (isUndefined (entrée)) {
            config._d = nouvelle date (hooks.now ());
        } else if (isDate (entrée)) {
            config._d = nouvelle date (input.valueOf ());
        } else if (typeof input === 'string') {
            configFromString (config);
        } else if (isArray (entrée)) {
            config._a = map (input.slice (0), function (obj) {
                return parseInt (obj, 10);
            });
            configFromArray (config);
        } else if (isObject (entrée)) {
            configFromObject (config);
        } else if (isNumber (entrée)) {
            // à partir de millisecondes
            config._d = nouvelle date (entrée);
        } autre {
            hooks.createFromInputFallback (config);
        }
    }

    function createLocalOrUTC (entrée, format, locale, strict, isUTC) {
        var c = {};

        if (format === vrai || format === faux) {
            strict = format;
            format = indéfini;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = indéfinie;
        }

        si (
            (isObject (entrée) && isObjectEmpty (entrée)) ||
            (isArray (entrée) && input.length === 0)
        ) {
            entrée = indéfini;
        }
        // La construction d'objet doit être effectuée de cette façon.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = entrée;
        c._f = format;
        c._strict = strict;

        return createFromConfig (c);
    }

    function createLocal (entrée, format, locale, stricte) {
        return createLocalOrUTC (entrée, format, locale, strict, faux);
    }

    var prototypeMin = obsolète (
            'moment (). min est obsolète, utilisez à la place moment.max. http://momentjs.com/guides/#/warnings/min-max/ ',
            fonction () {
                var autre = createLocal.apply (null, arguments);
                if (this.isValid () && other.isValid ()) {
                    retourne autre <ceci? ceci: autre;
                } autre {
                    return createInvalid ();
                }
            }
        ),
        prototypeMax = obsolète (
            'moment (). max est obsolète, utilisez moment.min à la place. http://momentjs.com/guides/#/warnings/min-max/ ',
            fonction () {
                var autre = createLocal.apply (null, arguments);
                if (this.isValid () && other.isValid ()) {
                    retourner autre> ceci? ceci: autre;
                } autre {
                    return createInvalid ();
                }
            }
        );

    // Choisissez un moment m parmi les moments pour que m [fn] (autre) soit vrai pour tous
    // autre. Cela dépend de la fonction fn pour être transitive.
    //
    // moments doit être soit un tableau d'objets moment, soit un tableau dont
    // premier élément est un tableau d'objets moment.
    function pickBy (fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray (moments [0])) {
            moments = moments [0];
        }
        if (! moments.length) {
            return createLocal ();
        }
        res = moments [0];
        pour (i = 1; i <moments.length; ++ i) {
            if (! moments [i] .isValid () || moments [i] [fn] (res)) {
                res = moments [i];
            }
        }
        return res;
    }

    // TODO: Utilisez [] .sort à la place?
    function min () {
        var args = [] .slice.call (arguments, 0);

        return pickBy ('isBefore', args);
    }

    function max () {
        var args = [] .slice.call (arguments, 0);

        return pickBy ('isAfter', args);
    }

    var maintenant = fonction () {
        date de retour maintenant? Date.now (): + nouvelle date ();
    };

    ordre var = [
        'an',
        'trimestre',
        'mois',
        'semaine',
        'journée',
        'heure',
        'minute',
        'deuxième',
        'milliseconde',
    ];

    function isDurationValid (m) {
        touche var,
            unitHasDecimal = false,
            je;
        for (clé en m) {
            si (
                hasOwnProp (m, clé) &&
                ! (
                    indexOf.call (ordre, clé)! == -1 &&
                    (m [clé] == null ||! isNaN (m [clé]))
                )
            ) {
                retourne faux;
            }
        }

        pour (i = 0; i <ordering.length; ++ i) {
            if (m [commande [i]]) {
                if (unitHasDecimal) {
                    retourne faux; // autorise uniquement les non-entiers pour la plus petite unité
                }
                if (parseFloat (m [ordre [i]])! == toInt (m [ordre [i]])) {
                    unitHasDecimal = vrai;
                }
            }
        }

        retourne vrai;
    }

    function isValid $ 1 () {
        return this._isValid;
    }

    function createInvalid $ 1 () {
        return createDuration (NaN);
    }

    function Durée (durée) {
        var normalizedInput = normalizeObjectUnits (durée),
            ans = normalizedInput.year || 0,
            trimestres = normalizedInput.quarter || 0,
            mois = normalizedInput.month || 0,
            semaines = normalizedInput.week || normalizedInput.isoWeek || 0,
            jours = normalizedInput.day || 0,
            heures = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            secondes = normalizedInput.second || 0,
            millisecondes = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid (normalizedInput);

        // représentation pour dateAddRemove
        this._milliseconds =
            + millisecondes +
            secondes * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            heures * 1000 * 60 * 60; // en utilisant 1000 * 60 * 60 au lieu de 36e5 pour éviter les erreurs d'arrondi en virgule flottante https://github.com/moment/moment/issues/2978
        // En raison de la dateAddRemove, 24 heures sont considérées comme différentes d'une
        // jour lorsque vous travaillez autour de l'heure d'été, nous devons les stocker séparément
        this._days = + jours + semaines * 7;
        // Il est impossible de traduire des mois en jours sans savoir
        // de quels mois vous parlez, nous devons donc stocker
        // il séparément.
        this._months = + mois + trimestres * 3 + années * 12;

        this._data = {};

        this._locale = getLocale ();

        this._bubble ();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (nombre) {
        if (nombre <0) {
            return Math.round (-1 * nombre) * -1;
        } autre {
            return Math.round (nombre);
        }
    }

    // compare deux tableaux, retourne le nombre de différences
    function compareArrays (tableau1, tableau2, dontConvert) {
        var len = Math.min (array1.length, array2.length),
            lengthDiff = Math.abs (array1.length - array2.length),
            diffs = 0,
            je;
        pour (i = 0; i <len; i ++) {
            si (
                (dontConvert && tableau1 [i]! == tableau2 [i]) ||
                (! dontConvert && toInt (tableau1 [i])! == toInt (tableau2 [i]))
            ) {
                diffs ++;
            }
        }
        retourne diffs + lengthDiff;
    }

    // MISE EN PAGE

    offset de fonction (jeton, séparateur) {
        addFormatToken (jeton, 0, 0, fonction () {
            var offset = this.utcOffset (),
                signe = '+';
            if (décalage <0) {
                offset = -offset;
                signe = '-';
            }
            revenir (
                signe +
                zeroFill (~~ (décalage / 60), 2) +
                séparateur +
                zeroFill (~~ offset% 60, 2)
            );
        });
    }

    offset ('Z', ':');
    décalage ('ZZ', '');

    // PARSING

    addRegexToken ('Z', matchShortOffset);
    addRegexToken ('ZZ', matchShortOffset);
    addParseToken (['Z', 'ZZ'], fonction (entrée, tableau, configuration) {
        config._useUTC = vrai;
        config._tzm = offsetFromString (matchShortOffset, entrée);
    });

    // AIDES

    // bloc de fuseau horaire
    // '+10: 00'> ['10', '00']
    // '-1530'> ['-15', '30']
    var chunkOffset = / ([\ + \ -] | \ d \ d) / gi;

    function offsetFromString (correspondance, chaîne) {
        var matches = (chaîne || '') .match (correspondance),
            tronçon,
            les pièces,
            minutes;

        if (correspond à === null) {
            return null;
        }

        chunk = correspond à [matches.length - 1] || [];
        parts = (chunk + '') .match (chunkOffset) || ['-', 0, 0];
        minutes = + (parties [1] * 60) + toInt (parties [2]);

        retour minutes === 0? 0: parties [0] === '+'? minutes: -minutes;
    }

    // Renvoie un moment de l'entrée, c'est-à-dire local / utc / zone équivalent à model.
    function cloneWithOffset (entrée, modèle) {
        var res, diff;
        if (model._isUTC) {
            res = modèle.clone ();
            diff =
                (isMoment (entrée) || isDate (entrée)
                    ? input.valueOf ()
                    : createLocal (entrée) .valueOf ()) - res.valueOf ();
            // Utilisez une API de bas niveau, car ce fn est une API de bas niveau.
            res._d.setTime (res._d.valueOf () + diff);
            hooks.updateOffset (res, false);
            return res;
        } autre {
            retourne createLocal (entrée) .local ();
        }
    }

    function getDateOffset (m) {
        // Sur Firefox.24 Date # getTimezoneOffset renvoie une virgule flottante.
        // https://github.com/moment/moment/pull/1871
        return -Math.round (m._d.getTimezoneOffset ());
    }

    // CROCHETS

    // Cette fonction sera appelée à chaque fois qu'un moment est muté.
    // Il est destiné à maintenir le décalage synchronisé avec le fuseau horaire.
    hooks.updateOffset = function () {};

    // DES MOMENTS

    // keepLocalTime = true signifie que changer uniquement le fuseau horaire, sans
    // affectant l'heure locale. Donc 5:31:26 +0300 - [utcOffset (2, true)] ->
    // 5:31:26 +0200 Il est possible que 5:31:26 n'existe pas avec offset
    // +0200, donc nous ajustons l'heure au besoin, pour qu'elle soit valide.
    //
    // Garder le temps ajoute / soustrait réellement (une heure)
    // à partir du temps réel représenté. C'est pourquoi nous appelons updateOffset
    // une seconde fois. Au cas où il voudrait que nous modifions à nouveau le décalage
    // _changeInProgress == cas vrai, alors nous devons ajuster, car
    // il n'y a pas d'heure dans le fuseau horaire donné.
    function getSetOffset (entrée, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (! this.isValid ()) {
            retourne l'entrée! = null? ceci: NaN;
        }
        if (entrée! = null) {
            if (typeof input === 'string') {
                input = offsetFromString (matchShortOffset, entrée);
                if (entrée === null) {
                    renvoyer ceci;
                }
            } else if (Math.abs (entrée) <16 &&! keepMinutes) {
                entrée = entrée * 60;
            }
            if (! this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset (this);
            }
            this._offset = entrée;
            this._isUTC = vrai;
            if (localAdjust! = null) {
                this.add (localAdjust, 'm');
            }
            if (offset! == entrée) {
                if (! keepLocalTime || this._changeInProgress) {
                    addSubtract (
                        ce,
                        createDuration (entrée - offset, 'm'),
                        1,
                        faux
                    );
                } else if (! this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset (ceci, vrai);
                    this._changeInProgress = null;
                }
            }
            renvoyer ceci;
        } autre {
            renvoyer ceci._isUTC? offset: getDateOffset (this);
        }
    }

    function getSetZone (entrée, keepLocalTime) {
        if (entrée! = null) {
            if (typeof input! == 'string') {
                entrée = -input;
            }

            this.utcOffset (entrée, keepLocalTime);

            renvoyer ceci;
        } autre {
            return -this.utcOffset ();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset (0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset (0, keepLocalTime);
            this._isUTC = faux;

            if (keepLocalTime) {
                this.subtract (getDateOffset (this), 'm');
            }
        }
        renvoyer ceci;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm! = null) {
            this.utcOffset (this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString (matchOffset, this._i);
            if (tZone! = null) {
                this.utcOffset (tZone);
            } autre {
                this.utcOffset (0, true);
            }
        }
        renvoyer ceci;
    }

    function hasAlignedHourOffset (entrée) {
        if (! this.isValid ()) {
            retourne faux;
        }
        entrée = entrée? createLocal (entrée) .utcOffset (): 0;

        return (this.utcOffset () - entrée)% 60 === 0;
    }

    function isDaylightSavingTime () {
        revenir (
            this.utcOffset ()> this.clone (). month (0) .utcOffset () ||
            this.utcOffset ()> this.clone (). mois (5) .utcOffset ()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (! isUndefined (this._isDSTShifted)) {
            renvoie this._isDSTShifted;
        }

        var c = {},
            autre;

        copyConfig (c, ceci);
        c = prepareConfig (c);

        si (c._a) {
            autre = c._isUTC? createUTC (c._a): createLocal (c._a);
            this._isDSTShifted =
                this.isValid () && compareArrays (c._a, other.toArray ())> 0;
        } autre {
            this._isDSTShifted = false;
        }

        renvoie this._isDSTShifted;
    }

    function isLocal () {
        renvoyer this.isValid ()? ! this._isUTC: false;
    }

    function isUtcOffset () {
        renvoyer this.isValid ()? this._isUTC: false;
    }

    function isUtc () {
        renvoyer this.isValid ()? this._isUTC && this._offset === 0: false;
    }

    // ASP.NET json format de date regex
    var aspNetRegex = / ^ (- | \ +)? (?: (\ d *) [.])? (\ d +): (\ d +) (? :: (\ d +) (\. \ d *)? )? $ /,
        // à partir de http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // un peu plus conforme à la spécification 4.4.3.2 2004, mais autorise la décimale n'importe où
        // et modifié pour autoriser les chaînes contenant à la fois la semaine et le jour
        isoRegex = /^(-|\+)?P(?:([-+ </font>?[0-9,. ) M)? (?: ([- +]? [0-9,.] *) W)? (?: ([- +]? [0-9,.] *) D)? (?: T (?: ([- +]? [0-9,.] *) H)? (?: ([- +]? [0-9,.] *) M)? (?: ([- +] ? [0-9,.] *) S)?)? $ /;

    function createDuration (entrée, clé) {
        var durée = entrée,
            // la correspondance avec les expressions rationnelles coûte cher, faites-le à la demande
            match = nul,
            signe,
            ret,
            diffRes;

        if (isDuration (entrée)) {
            durée = {
                ms: entrée._millisecondes,
                d: input._days,
                M: entrée._mois,
            };
        } else if (isNumber (entrée) ||! isNaN (+ entrée)) {
            durée = {};
            if (clé) {
                durée [clé] = + entrée;
            } autre {
                durée.millisecondes = + entrée;
            }
        } else if ((match = aspNetRegex.exec (entrée))) {
            sign = match [1] === '-'? -1: 1;
            durée = {
                y: 0,
                d: toInt (correspond au signe [DATE]) *,
                h: toInt (correspond au signe [HOUR]) *,
                m: toInt (correspond au signe [MINUTE]) *,
                s: toInt (match [SECOND]) * signe,
                ms: toInt (absRound (match [MILLISECOND] * 1000)) * sign, // le point décimal milliseconde est inclus dans la correspondance
            };
        } else if ((match = isoRegex.exec (entrée))) {
            sign = match [1] === '-'? -1: 1;
            durée = {
                y: parseIso (correspondance [2], signe),
                M: parseIso (correspondance [3], signe),
                w: parseIso (correspondance [4], signe),
                d: parseIso (correspondance [5], signe),
                h: parseIso (correspondance [6], signe),
                m: parseIso (correspondance [7], signe),
                s: parseIso (correspondance [8], signe),
            };
        } else if (durée == null) {
            // vérifie la valeur nulle ou indéfinie
            durée = {};
        } sinon si (
            typeof duration === 'objet' &&
            ('de' en durée || 'à' en durée)
        ) {
            diffRes = momentsDifférence (
                createLocal (durée.from),
                createLocal (durée.à)
            );

            durée = {};
            duration.ms = diffRes.millisecondes;
            duration.M = diffRes.months;
        }

        ret = nouvelle Durée (durée);

        if (isDuration (entrée) && hasOwnProp (entrée, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration (entrée) && hasOwnProp (entrée, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Durée.prototype;
    createDuration.invalid = createInvalid $ 1;

    function parseIso (inp, sign) {
        // Nous utiliserions normalement ~~ inp pour cela, mais malheureusement aussi
        // convertit les flottants en entiers.
        // inp est peut-être indéfini, donc faites attention en appelant replace dessus.
        var res = inp && parseFloat (inp.replace (',', '.'));
        // applique le signe pendant que nous y sommes
        return (isNaN (res)? 0: res) * signe;
    }

    function positiveMomentsDifference (base, autre) {
        var res = {};

        res.months =
            other.month () - base.month () + (other.year () - base.year ()) * 12;
        if (base.clone (). add (res.months, 'M'). isAfter (other)) {
            --res.months;
        }

        res.millisecondes = + autre - + base.clone (). add (res.months, 'M');

        return res;
    }

    function momentsDifference (base, autre) {
        var res;
        if (! (base.isValid () && other.isValid ())) {
            return {millisecondes: 0, mois: 0};
        }

        autre = cloneWithOffset (autre, base);
        if (base.isBefore (autre)) {
            res = positiveMomentsDifference (base, autre);
        } autre {
            res = positiveMomentsDifference (autre, base);
            res.millisecondes = -res.millisecondes;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: supprimer l'argument 'name' après la suppression de la dépréciation
    function createAdder (direction, nom) {
        fonction de retour (val, période) {
            var dur, tmp;
            // inverser les arguments, mais s'en plaindre
            if (période! == null &&! isNaN (+ période)) {
                deprecateSimple (
                    Nom,
                    'moment().' +
                        nom +
                        '(point, nombre) est obsolète. Veuillez utiliser moment (). ' +
                        nom +
                        '(nombre, point). '+
                        'Voir http://momentjs.com/guides/#/warnings/add-inverted-param/ pour plus d'informations.'
                );
                tmp = val;
                val = période;
                période = tmp;
            }

            dur = createDuration (val, période);
            addSubtract (this, dur, direction);
            renvoyer ceci;
        };
    }

    function addSubtract (maman, durée, isAdding, updateOffset) {
        var millisecondes = durée._millisecondes,
            jours = absRound (durée._ jours),
            mois = absRound (durée._mois);

        if (! mom.isValid ()) {
            // Pas d'opération
            revenir;
        }

        updateOffset = updateOffset == null? true: updateOffset;

        if (mois) {
            setMonth (maman, get (maman, 'Mois') + mois * isAdding);
        }
        if (jours) {
            set $ 1 (maman, 'Date', get (maman, 'Date') + jours * isAdding);
        }
        if (millisecondes) {
            mom._d.setTime (mom._d.valueOf () + millisecondes * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset (maman, jours || mois);
        }
    }

    var add = createAdder (1, 'ajouter'),
        soustraire = createAdder (-1, 'soustraire');

    function isString (entrée) {
        retourne le type d'entrée === 'string' || input instanceof String;
    }

    // tapez MomentInput = Moment | Date | chaîne | nombre | (nombre | chaîne) [] | MomentInputObject | annuler; // null | indéfini
    function isMomentInput (entrée) {
        revenir (
            isMoment (entrée) ||
            isDate (entrée) ||
            isString (entrée) ||
            isNumber (entrée) ||
            isNumberOrStringArray (entrée) ||
            isMomentInputObject (entrée) ||
            entrée === null ||
            entrée === undefined
        );
    }

    function isMomentInputObject (entrée) {
        var objectTest = isObject (entrée) &&! isObjectEmpty (entrée),
            propertyTest = faux,
            propriétés = [
                'années',
                'an',
                'y',
                'mois',
                'mois',
                «M»,
                'jours',
                'journée',
                'ré',
                'Rendez-vous',
                'Date',
                'RÉ',
                'les heures',
                'heure',
                «h»,
                'minutes',
                'minute',
                «m»,
                'secondes',
                'deuxième',
                's',
                'millisecondes',
                'milliseconde',
                'Mme',
            ],
            je,
            biens;

        pour (i = 0; i <properties.length; i + = 1) {
            propriété = propriétés [i];
            propertyTest = propertyTest || hasOwnProp (entrée, propriété);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray (entrée) {
        var arrayTest = isArray (entrée),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter (fonction (élément) {
                    return! isNumber (élément) && isString (entrée);
                }). length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec (entrée) {
        var objectTest = isObject (entrée) &&! isObjectEmpty (entrée),
            propertyTest = faux,
            propriétés = [
                'même jour',
                'le prochain jour',
                'dernier jour',
                'la semaine prochaine',
                'La semaine dernière',
                'sameElse',
            ],
            je,
            biens;

        pour (i = 0; i <properties.length; i + = 1) {
            propriété = propriétés [i];
            propertyTest = propertyTest || hasOwnProp (entrée, propriété);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat (myMoment, now) {
        var diff = monMoment.diff (maintenant, 'jours', vrai);
        retourne diff <-6
            ? 'sameElse'
            : diff <-1
            ? 'La semaine dernière'
            : diff <0
            ? 'dernier jour'
            : diff <1
            ? 'même jour'
            : diff <2
            ? 'le prochain jour'
            : diff <7
            ? 'la semaine prochaine'
            : 'sameElse';
    }

    calendrier de fonction $ 1 (heure, formats) {
        // Prise en charge d'un seul paramètre, les formats ne surchargent que la fonction de calendrier
        if (arguments.length === 1) {
            if (! arguments [0]) {
                heure = indéfinie;
                formats = indéfini;
            } else if (isMomentInput (arguments [0])) {
                heure = arguments [0];
                formats = indéfini;
            } else if (isCalendarSpec (arguments [0])) {
                formats = arguments [0];
                heure = indéfinie;
            }
        }
        // Nous voulons comparer le début d'aujourd'hui avec celui-ci.
        // Le début de la journée dépend du fait que nous soyons local / utc / offset ou non.
        var maintenant = temps || createLocal (),
            sod = cloneWithOffset (maintenant, ceci) .startOf ('jour'),
            format = hooks.calendarFormat (this, sod) || 'sameElse',
            sortie =
                formats &&
                (isFunction (formats [format])
                    ? formats [format] .call (ceci, maintenant)
                    : formats [format]);

        retourne this.format (
            sortie || this.localeData (). calendar (format, this, createLocal (maintenant))
        );
    }

    function clone () {
        retourne un nouveau moment (ceci);
    }

    function isAfter (entrée, unités) {
        var localInput = isMoment (entrée)? entrée: createLocal (entrée);
        if (! (this.isValid () && localInput.isValid ())) {
            retourne faux;
        }
        unités = normaliserUnités (unités) || «milliseconde»;
        if (unités === 'milliseconde') {
            return this.valueOf ()> localInput.valueOf ();
        } autre {
            return localInput.valueOf () <this.clone (). startOf (unités) .valueOf ();
        }
    }

    function isBefore (entrée, unités) {
        var localInput = isMoment (entrée)? entrée: createLocal (entrée);
        if (! (this.isValid () && localInput.isValid ())) {
            retourne faux;
        }
        unités = normaliserUnités (unités) || «milliseconde»;
        if (unités === 'milliseconde') {
            return this.valueOf () <localInput.valueOf ();
        } autre {
            renvoie this.clone (). endOf (unités) .valueOf () <localInput.valueOf ();
        }
    }

    function isB Between (from, to, units, inclusivité) {
        var localFrom = isMoment (de)? de: createLocal (de),
            localTo = isMoment (à)? à: createLocal (à);
        if (! (this.isValid () && localFrom.isValid () && localTo.isValid ())) {
            retourne faux;
        }
        inclusivité = inclusivité || '()';
        revenir (
            (inclusivité [0] === '('
                ? this.isAfter (localFrom, unités)
                :! this.isBefore (localFrom, unités)) &&
            (inclusivité [1] === ')'
                ? this.isBefore (localTo, unités)
                :! this.isAfter (localTo, unités))
        );
    }

    function isSame (entrée, unités) {
        var localInput = isMoment (entrée)? entrée: createLocal (entrée),
            inputMs;
        if (! (this.isValid () && localInput.isValid ())) {
            retourne faux;
        }
        unités = normaliserUnités (unités) || «milliseconde»;
        if (unités === 'milliseconde') {
            return this.valueOf () === localInput.valueOf ();
        } autre {
            inputMs = localInput.valueOf ();
            revenir (
                this.clone (). startOf (unités) .valueOf () <= inputMs &&
                inputMs <= this.clone (). endOf (unités) .valueOf ()
            );
        }
    }

    function isSameOrAfter (entrée, unités) {
        renvoie this.isSame (entrée, unités) || this.isAfter (entrée, unités);
    }

    function isSameOrBefore (entrée, unités) {
        renvoie this.isSame (entrée, unités) || this.isBefore (entrée, unités);
    }

    function diff (entrée, unités, asFloat) {
        var que, zoneDelta, sortie;

        if (! this.isValid ()) {
            return NaN;
        }

        que = cloneWithOffset (entrée, ceci);

        if (! that.isValid ()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset () - this.utcOffset ()) * 6e4;

        units = normalizeUnits (unités);

        commutateur (unités) {
            cas 'année':
                output = monthDiff (ceci, cela) / 12;
                Pause;
            cas 'mois':
                output = monthDiff (ceci, cela);
                Pause;
            cas 'trimestre':
                output = monthDiff (ceci, cela) / 3;
                Pause;
            cas 'seconde':
                sortie = (ceci - cela) / 1e3;
                Pause; // 1000
            cas 'minute':
                sortie = (ceci - cela) / 6e4;
                Pause; // 1000 * 60
            case 'heure':
                sortie = (ceci - cela) / 36e5;
                Pause; // 1000 * 60 * 60
            cas 'jour':
                sortie = (ceci - cela - zoneDelta) / 864e5;
                Pause; // 1000 * 60 * 60 * 24, annuler dst
            cas 'semaine':
                sortie = (ceci - cela - zoneDelta) / 6048e5;
                Pause; // 1000 * 60 * 60 * 24 * 7, annuler dst
            défaut:
                sortie = ceci - cela;
        }

        retourner comme Flottant? sortie: absFloor (sortie);
    }

    function monthDiff (a, b) {
        if (a.date () <b.date ()) {
            // les calculs de fin de mois fonctionnent correctement lorsque le mois de début a plus
            // jours que le mois de fin.
            return -monthDiff (b, a);
        }
        // différence en mois
        var wholeMonthDiff = (b.year () - a.year ()) * 12 + (b.month () - a.month ()),
            // b is in (ancre - 1 mois, ancre + 1 mois)
            anchor = a.clone (). add (wholeMonthDiff, 'mois'),
            ancre2,
            régler;

        if (b - ancre <0) {
            anchor2 = a.clone (). add (wholeMonthDiff - 1, 'mois');
            // linéaire sur le mois
            ajuster = (b - ancre) / (ancre - ancre2);
        } autre {
            anchor2 = a.clone (). add (wholeMonthDiff + 1, 'mois');
            // linéaire sur le mois
            ajuster = (b - ancre) / (ancre2 - ancre);
        }

        // recherche un zéro négatif, retourne zéro si zéro négatif
        return - (wholeMonthDiff + ajuster) || 0;
    }

    hooks.defaultFormat = 'AAAA-MM-JJTHH: mm: ssZ';
    hooks.defaultFormatUtc = 'AAAA-MM-JJTHH: mm: ss [Z]';

    function toString () {
        return this.clone (). locale ('en'). format ('jjj MMM JJ AAAA HH: mm: ss [GMT] ZZ');
    }

    function toISOString (keepOffset) {
        if (! this.isValid ()) {
            return null;
        }
        var utc = keepOffset! == true,
            m = utc? this.clone (). utc (): this;
        si (m.an () <0 || m.year ()> 9999) {
            return formatMoment (
                m,
                UTC
                    ? «AAAAAA-MM-JJ [T] HH: mm: ss.SSS [Z]»
                    : 'AAAAAA-MM-JJ [T] HH: mm: ss.SSSZ'
            );
        }
        if (isFunction (Date.prototype.toISOString)) {
            // l'implémentation native est ~ 50x plus rapide, utilisez-la quand nous le pouvons
            if (utc) {
                retourne this.toDate (). toISOString ();
            } autre {
                retourne une nouvelle date (this.valueOf () + this.utcOffset () * 60 * 1000)
                    .toISOString ()
                    .replace ('Z', formatMoment (m, 'Z'));
            }
        }
        return formatMoment (
            m,
            UTC ? "AAAA-MM-JJ [T] HH: mm: ss.SSS [Z]": "AAAA-MM-JJ [T] HH: mm: ss.SSSZ"
        );
    }

    / **
     * Renvoie une représentation lisible par l'homme d'un moment qui peut
     * également être évalué pour obtenir un nouveau moment qui est le même
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     * /
    function inspect () {
        if (! this.isValid ()) {
            return 'moment.invalid (/ *' + this._i + '* /)';
        }
        var func = 'moment',
            zone = '',
            préfixe,
            an,
            datetime,
            suffixe;
        if (! this.isLocal ()) {
            func = this.utcOffset () === 0? 'moment.utc': 'moment.parseZone';
            zone = "Z";
        }
        prefix = '[' + func + '("]';
        année = 0 <= cette.année () && cette.année () <= 9999? 'YYYY': 'YYYYYY';
        datetime = '-MM-JJ [T] HH: mm: ss.SSS';
        suffixe = zone + '[")]';

        renvoie this.format (préfixe + année + date-heure + suffixe);
    }

    format de fonction (inputString) {
        if (! inputString) {
            inputString = this.isUtc ()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment (ceci, inputString);
        return this.localeData (). postformat (sortie);
    }

    function from (time, withoutSuffix) {
        si (
            this.isValid () &&
            ((isMoment (heure) && heure.isValid ()) || createLocal (heure) .isValid ())
        ) {
            return createDuration ({to: this, from: time})
                .locale (this.locale ())
                .humaniser (! sans suffixe);
        } autre {
            return this.localeData (). invalidDate ();
        }
    }

    function fromNow (withoutSuffix) {
        renvoyer this.from (createLocal (), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        si (
            this.isValid () &&
            ((isMoment (heure) && heure.isValid ()) || createLocal (heure) .isValid ())
        ) {
            return createDuration ({from: this, to: time})
                .locale (this.locale ())
                .humaniser (! sans suffixe);
        } autre {
            return this.localeData (). invalidDate ();
        }
    }

    function toNow (sans suffixe) {
        retourne this.to (createLocal (), withoutSuffix);
    }

    // Si vous passez une clé locale, cela définira les paramètres régionaux pour cela
    // exemple. Sinon, il renverra la configuration locale
    // variables pour cette instance.
    fonction locale (clé) {
        var newLocaleData;

        if (clé === undefined) {
            return this._locale._abbr;
        } autre {
            newLocaleData = getLocale (clé);
            if (newLocaleData! = null) {
                this._locale = newLocaleData;
            }
            renvoyer ceci;
        }
    }

    var lang = obsolète (
        'moment (). lang () est obsolète. À la place, utilisez moment (). LocaleData () pour obtenir la configuration de la langue. Utilisez moment (). Locale () pour changer de langue. ',
        clé de fonction) {
            if (clé === undefined) {
                return this.localeData ();
            } autre {
                return this.locale (clé);
            }
        }
    );

    function localeData () {
        renvoie this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // modulo réel - gère les nombres négatifs (pour les dates antérieures à 1970):
    function mod $ 1 (dividende, diviseur) {
        return ((dividende% diviseur) + diviseur)% diviseur;
    }

    function localStartOfDate (y, m, d) {
        // le constructeur de date remappe les années 0-99 à 1900-1999
        si (y <100 && y> = 0) {
            // préserve les années bissextiles en utilisant un cycle complet de 400 ans, puis réinitialise
            retourne une nouvelle date (y + 400, m, d) - MS_PER_400_YEARS;
        } autre {
            retourne une nouvelle date (a, m, j) .valueOf ();
        }
    }

    function utcStartOfDate (y, m, d) {
        // Date.UTC remappe les années 0-99 à 1900-1999
        si (y <100 && y> = 0) {
            // préserve les années bissextiles en utilisant un cycle complet de 400 ans, puis réinitialise
            date de retour.UTC (y + 400, m, d) - MS_PER_400_YEARS;
        } autre {
            date de retour.UTC (a, m, j);
        }
    }

    function startOf (unités) {
        var time, startOfDate;
        units = normalizeUnits (unités);
        if (unités === undefined || unités === 'milliseconde' ||! this.isValid ()) {
            renvoyer ceci;
        }

        startOfDate = this._isUTC? utcStartOfDate: localStartOfDate;

        commutateur (unités) {
            cas 'année':
                time = startOfDate (this.year (), 0, 1);
                Pause;
            cas 'trimestre':
                heure = startOfDate (
                    cette année(),
                    this.month () - (this.month ()% 3),
                    1
                );
                Pause;
            cas 'mois':
                time = startOfDate (this.year (), this.month (), 1);
                Pause;
            cas 'semaine':
                heure = startOfDate (
                    cette année(),
                    ce mois-ci(),
                    this.date () - this.weekday ()
                );
                Pause;
            cas 'isoWeek':
                heure = startOfDate (
                    cette année(),
                    ce mois-ci(),
                    this.date () - (this.isoWeekday () - 1)
                );
                Pause;
            cas 'jour':
            cas 'date':
                time = startOfDate (this.year (), this.month (), this.date ());
                Pause;
            case 'heure':
                time = this._d.valueOf ();
                temps - = mod $ 1 (
                    time + (this._isUTC? 0: this.utcOffset () * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                Pause;
            cas 'minute':
                time = this._d.valueOf ();
                heure - = mod $ 1 (heure, MS_PER_MINUTE);
                Pause;
            cas 'seconde':
                time = this._d.valueOf ();
                heure - = mod $ 1 (heure, MS_PER_SECOND);
                Pause;
        }

        this._d.setTime (heure);
        hooks.updateOffset (ceci, vrai);
        renvoyer ceci;
    }

    function endOf (unités) {
        var time, startOfDate;
        units = normalizeUnits (unités);
        if (unités === undefined || unités === 'milliseconde' ||! this.isValid ()) {
            renvoyer ceci;
        }

        startOfDate = this._isUTC? utcStartOfDate: localStartOfDate;

        commutateur (unités) {
            cas 'année':
                time = startOfDate (this.year () + 1, 0, 1) - 1;
                Pause;
            cas 'trimestre':
                temps =
                    startOfDate (
                        cette année(),
                        this.month () - (this.month ()% 3) + 3,
                        1
                    ) - 1;
                Pause;
            cas 'mois':
                time = startOfDate (this.year (), this.month () + 1, 1) - 1;
                Pause;
            cas 'semaine':
                temps =
                    startOfDate (
                        cette année(),
                        ce mois-ci(),
                        this.date () - this.weekday () + 7
                    ) - 1;
                Pause;
            cas 'isoWeek':
                temps =
                    startOfDate (
                        cette année(),
                        ce mois-ci(),
                        this.date () - (this.isoWeekday () - 1) + 7
                    ) - 1;
                Pause;
            cas 'jour':
            cas 'date':
                time = startOfDate (this.year (), this.month (), this.date () + 1) - 1;
                Pause;
            case 'heure':
                time = this._d.valueOf ();
                temps + =
                    MS_PER_HOUR -
                    mod $ 1 (
                        time + (this._isUTC? 0: this.utcOffset () * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                Pause;
            cas 'mi nute':
                time = this._d.valueOf ();
                heure + = MS_PER_MINUTE - mod $ 1 (heure, MS_PER_MINUTE) - 1;
                Pause;
            cas 'seconde':
                time = this._d.valueOf ();
                heure + = MS_PER_SECOND - mod $ 1 (heure, MS_PER_SECOND) - 1;
                Pause;
        }

        this._d.setTime (heure);
        hooks.updateOffset (ceci, vrai);
        renvoyer ceci;
    }

    function valueOf () {
        renvoie this._d.valueOf () - (this._offset || 0) * 60000;
    }

    function unix () {
        return Math.floor (this.valueOf () / 1000);
    }

    function toDate () {
        return new Date (this.valueOf ());
    }

    function toArray () {
        var m = ceci;
        revenir [
            mon oreille(),
            m. mois (),
            m.date (),
            m.heure (),
            m.minute (),
            m.seconde (),
            m.milliseconde (),
        ];
    }

    function toObject () {
        var m = ceci;
        revenir {
            années: m.année (),
            mois: m.month (),
            date: m.date (),
            heures: m.heures (),
            minutes: m.minutes (),
            secondes: m.secondes (),
            millisecondes: m.millisecondes (),
        };
    }

    function toJSON () {
        // nouvelle date (NaN) .toJSON () === null
        renvoyer this.isValid ()? this.toISOString (): null;
    }

    function isValid $ 2 () {
        return isValid (this);
    }

    function parsingFlags () {
        return extend ({}, getParsingFlags (this));
    }

    function invalidAt () {
        return getParsingFlags (this) .overflow;
    }

    function creationData () {
        revenir {
            entrée: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken ('N', 0, 0, 'eraAbbr');
    addFormatToken ('NN', 0, 0, 'eraAbbr');
    addFormatToken ('NNN', 0, 0, 'eraAbbr');
    addFormatToken ('NNNN', 0, 0, 'eraName');
    addFormatToken ('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken ('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken ('y', ['yy', 2], 0, 'eraYear');
    addFormatToken ('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken ('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken ('N', matchEraAbbr);
    addRegexToken ('NN', matchEraAbbr);
    addRegexToken ('NNN', matchEraAbbr);
    addRegexToken ('NNNN', matchEraName);
    addRegexToken ('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));
