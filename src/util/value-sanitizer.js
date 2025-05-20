class Sanitizer {
    /**
     * Sanitizes unsafe values (null / undefined) out of an array.
     * @param {array} arr Array to sanitize.
     * @param {*} [def] Default value to replace null / undefined with.
     * @returns {array} Sanitized array.
     * NOTE: This does not mutate the original array.
     */
    static array (arr, def) {
        return arr.flatMap(val => {
            // eslint-disable-next-line no-eq-null, eqeqeq
            if (val == null) return [];
            if (Array.isArray(val)) return [this.array(val, def)];
            if (typeof val !== 'object') return [val];
            return [this.object(val, def)];
        });
    }

    /**
     * Sanitizes unsafe values (null / undefined) out of an object.
     * @param {!object} obj Object to sanitize.
     * @param {*} [def] Default value to replace null / undefined with.
     * @returns {!object} Sanitized object.
     * NOTE: This mutates the original object.
     */
    static object (obj, def) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = this.value(obj[keys[i]], def);
        }
        return obj;
    }

    /**
     * Sanitizes unsafe values (null / undefined) out of an array.
     * @param {map} arr Array to sanitize.
     * @param {*} [def] Default value to replace null / undefined with.
     * @returns {map} Sanitized map.
     * NOTE: This mutates the original map.
     */
    static map (map, def) {
        for (const key of map.keys()) {
            // eslint-disable-next-line no-eq-null, eqeqeq
            if (key == null) {
                map.delete(key);
                continue;
            }
            map.set(key, this.value(map.get(key), def));
        }
        return map;
    }

    /**
     * Sanitizes unsafe values (null / undefined) out of an array.
     * @param {*} val Value to sanitize.
     * @param {*} [def] Default value to replace null / undefined with. Defaults to an empty string.
     * @returns {!*} Sanitized value.
     * NOTE: This *may* mutate the original value.
     */
    static value (val, def = '') {
        // eslint-disable-next-line no-eq-null, eqeqeq
        if (val == null) return def; // This is done before the type check because of `undefined`.
        if (typeof val !== 'object') return val;
        if (Array.isArray(val)) return this.array(val, def);
        if (val instanceof Map) return this.map(val, def);
        return this.object(val, def);
    }

    /**
     * Sanitizes unsafe values (null / undefined) out of an array.
     * @param {*} val Value to attempt to parse.
     * @param {*} [def] Default value to replace null / undefined with. Defaults to an empty string.
     * @returns {!*} Sanitized value.
     * NOTE: This *may* mutate the original value if it is not a string. @see {value}
     */
    static parseJSON (val, def = '') {
        if (typeof val !== 'string') return this.value(val, def);
        try {
            val = JSON.parse(val, (_key, value) => this.value(value, def));
        } catch {
            val = def;
        }
        return this.value(val, def);
    }
}

module.exports = Sanitizer;
