// Return a string representing the difference between two dates in minutes
// and seconds.
function formatTimeDiff(startTime, endTime) {
  let timeDiff = (endTime - startTime) / 1000;

  if (timeDiff > 60) {
    timeDiff = `${Math.floor(timeDiff / 60)}m ${Math.floor(timeDiff % 60)}s`;
  } else {
    timeDiff = `${timeDiff}s`
  }

  return `Done in ${timeDiff}`;
}


// Print execution time of a function.
// To pass any argument to the function, just add the arguments to this function
// call.
//
// Eg. timeit(sum, 10, 20) # 0.001
function timeit(func) {
  const startTime = new Date();

  if (typeof func === 'function') {
    const res = func(...[...arguments].slice(1));

    const endTime = new Date();
    console.log(formatTimeDiff(startTime, endTime));

    return res;
  }

  return func.then((res) => {
    const endTime = new Date();
    console.log(formatTimeDiff(startTime, endTime));

    return res;
  });
};


module.exports = timeit;
