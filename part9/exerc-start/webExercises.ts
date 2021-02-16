// type exArr = Array<number>;
interface usrData {
  daily_exercises: Array<number>
  target: number
}

interface userResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exCalculator = (userData: usrData): userResult => {
  const arr = userData.daily_exercises;
  const target = userData.target;

  const periodLength: number = arr.length;
  const trainingDays: number = arr.filter(a => a > 0).length;
  const average: number = arr.filter((_a, i) => i !== 0).reduce((acc, cur) => acc + cur, 0) / (arr.length);

  const getRating = (a: number) : number => {
      if (a >= 2) return 3;
      else if (a < 2 && a > 1) return 2;
      else return 1;
  };
  const rating: number = getRating(average);

  const getDescription = (a: number) : string => {
      switch (a) {
          case 3:
              return 'Awesome, keep up for the next week!';
          case 2:
              return 'not too bad but could be better';
          default:
              return 'Thats bad, but keep up';
      }
  };
  const ratingDescription: string = getDescription(rating);

  function getResults(data: userResult) {
      return data;
  }

  const resObj = {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: average >= 1 ? true : false,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average
  };

  return getResults(resObj);
};

export { exCalculator };
