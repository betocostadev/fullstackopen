type userInput = Array<number>
interface userResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (arr: userInput) => {
    const target: number = arr[0]
    const periodLength: number = arr.length - 1
    const trainingDays: number = arr.filter(a => a > 0).length - 1
    const average: number = arr.filter((a, i) => i !== 0).reduce((acc, cur) => acc + cur, 0) / (arr.length - 1)

    const getRating = (a: number) : number => {
        if (a >= 2) return 3
        else if (a < 2 && a > 1) return 2
        else return 1
    }
    const rating: number = getRating(average)

    const getDescription = (a: number) : string => {
        switch (a) {
            case 3:
                return 'Awesome, keep up for the next week!'
            case 2:
                return 'not too bad but could be better'
            default:
                return 'Thats bad, but keep up'
        }
    }
    const ratingDescription: string = getDescription(rating)

    function getResults(data: userResult) {
        return data
    }

    const resObj = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: average >= target ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }

    return getResults(resObj)
}

const userData: Array<number> = []
let correct: boolean = false

const parseArguments = (args: Array<any>): boolean => {
    args.forEach((a, i) => {
        if (i >= 2) {
            let num = Number(a);
            if (isNaN(num)) {
                throw new Error('You must provide only numbers!');
            }
            userData.push(Number(a));
        }
    })

    if (userData.length < 2) throw new Error('Not enough arguments');
    else correct = true

    return true
}


try {
    parseArguments(process.argv)
    if (correct) {
        console.log(exerciseCalculator(userData))
    }
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
