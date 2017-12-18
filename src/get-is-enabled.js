import { find, curry } from 'ramda';

// matchName = s => x => x;
const matchName = s => x => x.name === s;

// enabled = x: Feature => boolean
const enabled = x => x && x.enabled ? true : false;

// hasDependencies = x: Feature => boolean
const hasDependencies = x => x.dependencies && x.dependencies.length > 0 ? true : false;

// checkDependencies = [...Feature] => [...String] => boolean;
const checkDependencies = features => names => names.reduce((acc, x) => acc ? getIsEnabled(features, x) : acc ,true);

// getIsEnabled = [...Feature] => String => boolean
const getIsEnabled = (features = [], featureName = '') => {
  const feature = find(matchName(featureName))(features);
  /**
   * If the feature doesn't exist or is not enabled then
   * return false.
   */
  if (!enabled(feature)) return false;

  /**
   * If the feature doesn't have any requirements, return true.
   */
  if (!hasDependencies(feature)) return true;

  /**
   * If the feature has dependencies, then check for any disabled dependencies 
   */
  return checkDependencies(features)(feature.dependencies);
};

export default curry(getIsEnabled);
