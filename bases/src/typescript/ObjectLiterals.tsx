interface Address {
  street: string;
  city?: string;
}

interface Person {
  /**
   * The name of the person.
   */
  name: string;

  /**
   * The age of the person.
   */
  age: number;

  /**
   * The address of the person.
   */
  address: Address;

  /**
   * A list of hobbies the person enjoys.
   */
  hobbies: string[];

  /**
   * Calculates the birth year of the person based on their age.
   * @returns The birth year.
   */
  getBirthYear: () => number;

  /**
   * Provides a summary of the person's details.
   * @returns A string summary.
   */
  getSummary: () => string;
}
const ObjectLiterals = () => {
  const person: Person = {
    name: "John Doe",
    age: 23,
    address: {
      street: "50 Main St",
      city: "Boston",
    },
    hobbies: ["reading", "coding", "playing"],
    getBirthYear() {
      return new Date().getFullYear() - this.age;
    },
    getSummary() {
      return `${this.name} is ${this.age} years old.`;
    },
  };

  return (
    <>
      <h3>Object Literals</h3>
      <p>Street: {person.address.street}</p>
      <p>City: {person.address.city}</p>
      <p>Hobbies: {person.hobbies.join(", ")}</p>
      <p>Birth Year: {person.getBirthYear()}</p>
      <p>Summary: {person.getSummary()}</p>
    </>
  );
};

export default ObjectLiterals;
