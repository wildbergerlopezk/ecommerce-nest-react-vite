"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSku = buildSku;
const slugify_1 = require("slugify");
function buildSku(productName, options) {
    const productSlug = (0, slugify_1.default)(productName, { lower: true, strict: true });
    const normalizedOptions = options
        .sort((a, b) => a.variantName.localeCompare(b.variantName))
        .map(({ optionName }) => (0, slugify_1.default)(optionName, { lower: true, strict: true }));
    return [productSlug, ...normalizedOptions].join('-');
}
//# sourceMappingURL=buildSKu.js.map