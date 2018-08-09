const express = require('express');
const printer = require('./pdf-make-loader');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    title: "API Express para Geração de PDF do CEUMA",
    version: "0.0.1"
  });
});

router.post('/pdf', (req, res) => {
  const { docDefinition } = req.body;
  const transformedDoc = traverseTreeAndTransform(docDefinition);
  
  // Make sure the browser knows this is a PDF.
  res.set('content-type', 'application/pdf');
  // Create the PDF and pipe it to the response object.
  const pdfDoc = printer.createPdfKitDocument(transformedDoc);
  pdfDoc.pipe(res);
  pdfDoc.end();
});

/**
 * 
 * @param {Object | Array} node
 * @description traverse the node and verifies if any of the elements has any match key
 * "layout" of "image", which must be transformed accordingly to be able to generate
 * the PDF file using the pdfMake library
 * @returns {Object | Array} transformed node
 */
const traverseTreeAndTransform = (node = {}) => {
  // TODO: otimizar o algoritmo de verificação da árvore
  const tree = Array.isArray(node) ? [...node]: { ...node };
  for (const key in tree) {
    if (typeof tree[key] === 'object') {
      if (key === 'layout') {
        tree[key] = transform(tree[key]);
      } else {
        tree[key] = traverseTreeAndTransform(tree[key]);
      }
    } else if (key === 'image') {
      tree[key] = `src/images/${tree[key]}`;
    }
  }
  return tree;
};

/**
 * 
 * @param {Object} node
 * @description transforms the elements contained in the node in functions that
 * return the values originally associated to those elements
 * @returns {Object} transformed node
 */
const transform = (node) => {
  const transformedNode = Array.isArray(node) ? [] : {};
  for (const prop in node) {
    transformedNode[prop] = function() {
      return node[prop];
    }
  }
  return transformedNode;
};

module.exports = router;