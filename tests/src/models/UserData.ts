export interface UserData {
    title: string;
    name: string;
    email: string;
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

export class UserDataBuilder {
    private data: Partial<UserData> = {};

    static default(): UserDataBuilder {
        const timestamp = Date.now();
        return new UserDataBuilder()
            .withTitle('Mr')
            .withName(`TestUser${timestamp}`)
            .withEmail(`testuser${timestamp}@example.com`)
            .withPassword('Password123!')
            .withDay('15')
            .withMonth('May')
            .withYear('1990')
            .withFirstName(`John${timestamp}`)
            .withLastName(`Doe${timestamp}`)
            .withCompany(`TestCompany${timestamp}`)
            .withAddress1(`123 Main St ${timestamp}`)
            .withAddress2(`Apt 4B ${timestamp}`)
            .withCountry('United States')
            .withState(`California${timestamp}`)
            .withCity(`Los Angeles${timestamp}`)
            .withZipcode(`9000${timestamp.toString().slice(-4)}`)
            .withMobileNumber(`555-01${timestamp.toString().slice(-6)}`);
    }

    withTitle(title: string): UserDataBuilder {
        this.data.title = title;
        return this;
    }

    withName(name: string): UserDataBuilder {
        this.data.name = name;
        return this;
    }

    withEmail(email: string): UserDataBuilder {
        this.data.email = email;
        return this;
    }

    withPassword(password: string): UserDataBuilder {
        this.data.password = password;
        return this;
    }

    withDay(day: string): UserDataBuilder {
        this.data.day = day;
        return this;
    }

    withMonth(month: string): UserDataBuilder {
        this.data.month = month;
        return this;
    }

    withYear(year: string): UserDataBuilder {
        this.data.year = year;
        return this;
    }

    withFirstName(firstName: string): UserDataBuilder {
        this.data.firstName = firstName;
        return this;
    }

    withLastName(lastName: string): UserDataBuilder {
        this.data.lastName = lastName;
        return this;
    }

    withCompany(company: string): UserDataBuilder {
        this.data.company = company;
        return this;
    }

    withAddress1(address1: string): UserDataBuilder {
        this.data.address1 = address1;
        return this;
    }

    withAddress2(address2: string): UserDataBuilder {
        this.data.address2 = address2;
        return this;
    }

    withCountry(country: string): UserDataBuilder {
        this.data.country = country;
        return this;
    }

    withState(state: string): UserDataBuilder {
        this.data.state = state;
        return this;
    }

    withCity(city: string): UserDataBuilder {
        this.data.city = city;
        return this;
    }

    withZipcode(zipcode: string): UserDataBuilder {
        this.data.zipcode = zipcode;
        return this;
    }

    withMobileNumber(mobileNumber: string): UserDataBuilder {
        this.data.mobileNumber = mobileNumber;
        return this;
    }

    build(): UserData {
        return this.data as UserData;
    }
}