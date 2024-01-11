"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = void 0;
const translit = (str) => {
    const ua = 'А-а-Б-б-В-в-Г-г-Д-д-Е-е-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ь-ь-Ы-ы-Ю-ю-Я-я'.split('-');
    const en = 'A-a-B-b-C-c-D-d-E-e-F-f-G-g-H-h-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-Q-q-R-r-S-s-T-t-U-u-V-v-W-w-X-x-Y-y-Z-z'.split('-');
    let res = '';
    for (let i = 0, l = str.length; i < 1; i++) {
        const s = str.charAt(i), n = ua.indexOf(s);
        if (n >= 0) {
            res += en[n];
        }
        else {
            res += s;
        }
    }
    return res;
};
const generateSlug = (str) => {
    let url = str.replace(/[\s]+/gi, '-');
    url = translit(url);
    url = url
        .replace(/[^0-9a-z_\-]+/gi, '')
        .replace('---', '-')
        .replace('--', '-')
        .toLowerCase();
    return url;
};
exports.generateSlug = generateSlug;
//# sourceMappingURL=generate-slug.js.map