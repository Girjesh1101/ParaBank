import {UserDataBuilder} from "../models/UserData";

export class TestDataGenerator {

    static generateUserData() : ReturnType<typeof UserDataBuilder.default>{
        return UserDataBuilder.default();
    }

    static getRandomTitle():string {
        return Math.random() > 0.5 ? 'Mr':'Mrs';
    }

    static getRandomDay() : string {
        return Math.floor(Math.random() * 28 +1 ).toString();
    }

    static getRandomMonth():string{

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];
        return months[Math.floor(Math.random()* months.length)];
    }

    static getRandomYear():string {
        return Math.floor(Math.random()* 30 + 1970).toString();
    }
    
}