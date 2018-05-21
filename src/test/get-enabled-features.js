import { describe } from 'riteway';
import getEnabledFeatures from '../get-enabled-features';
import deepFreeze from 'deep-freeze';
import createFeature from '../test-fixtures/create-feature';

describe('getEnabledFeatures()', async should => {
  const { assert } = should('return an empty array');
  assert({
    given: 'no arguments',
    actual: getEnabledFeatures(),
    expected: []
  });
});

describe('getEnabledFeatures([])', async should => {
  const { assert } = should('return an empty array');
  assert({
    given: 'an empty array',
    actual: getEnabledFeatures(),
    expected: []
  });
});

describe('getEnabledFeatures([...Feature])', async should => {
  const { assert } = should();
  const features = [
    createFeature({
      name: 'posts',
      isActive: true
    }),
    createFeature({
      name: 'post-rating',
      isActive: false,
      dependencies: ['posts']
    }),
    createFeature({
      name: 'post-rating-graph',
      isActive: true,
      dependencies: ['post-rating']
    }),
    createFeature({
      name: 'reports',
      isActive: false
    }),
    createFeature({
      name: 'report-rating',
      isActive: true,
      dependencies: ['reports']
    }),
    createFeature({
      name: 'report-rating-graph',
      isActive: true,
      dependencies: ['report-rating']
    }),
    createFeature({
      name: 'comments',
      isActive: true
    }),
    createFeature({
      name: 'comment-rating',
      isActive: true,
      dependencies: ['comments']
    }),
    createFeature({
      name: 'comment-rating-graph',
      isActive: true,
      dependencies: ['comment-rating']
    })
  ];
  deepFreeze(features);
  console.log('features',features);

  assert({
    given: 'an array of features',
    should: 'return the correct enabled features',
    actual: getEnabledFeatures(features),
    expected: ['posts', 'comments', 'comment-rating', 'comment-rating-graph']
  });
});
