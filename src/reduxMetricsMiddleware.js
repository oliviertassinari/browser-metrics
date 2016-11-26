// @flow weak

import Metric from './Metric';

const factory = (options = {}) => {
  const {
    trackTiming,
    minDuration = 50, // ms
  } = options;

  const metricsMiddleware = () => (next) => (action) => {
    const metric = new Metric(action.type);

    metric.start();
    const result = next(action);
    metric.end();

    // Dispatch the timing after the view is computed.
    // Only track events longer than this amount.
    if (metric.duration > minDuration) {
      trackTiming('redux', action.type, Math.round(metric.duration));
    }

    return result;
  };

  return metricsMiddleware;
};

export default factory;
