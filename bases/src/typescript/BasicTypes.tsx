export const BasicTypes = () => {

  const name:string = "John Doe";
  const age:number = 25;
  const isStudent:boolean = true;
  const hobbies:string[] = ['reading', 'coding', 'playing'];

  hobbies.push('swimming');



  return (
    <>
      <h3>Basic Types</h3>
      <p>String: {name}</p>
      <p>Number: {age}</p>
      <p>Boolean: {isStudent ? 'Yes' : 'No'}</p>
      <p>Array: {hobbies.join(', ')}</p>

    </>
  );
};
