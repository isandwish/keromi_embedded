import model from "../models/ml_model.json" with { type: "json" };
import { computeFeatures } from "./feature.service.js";

function traverseTree(tree, feats, names) {
  const nodes = tree.nodes;
  let idx = 0;

  while (true) {
    const node = nodes[idx];
    const left = node[0];
    const right = node[1];
    const feat = node[2];
    const thr = node[3];
    const val = node[4];
    const type = node[7];

    if (type === 0 || left === -1) {
      return val;            // leaf node → return predicted value
    }

    const featureName = names[feat];
    const featureValue = feats[featureName];

    // safety fallback
    if (featureValue === undefined) return val;

    idx = featureValue <= thr ? left : right;
  }
}

export function predictScore(input) {
  const feats = computeFeatures(input);
  const names = model.features;

  let sum = 0;
  for (const tree of model.trees) {
    sum += traverseTree(tree, feats, names);
  }

  // denormalize
  const min = model.scaler_min[0];
  const max = model.scaler_max[0];
  const score = sum * (max - min) + min;

  return Math.max(0, Math.min(100, score));
}
