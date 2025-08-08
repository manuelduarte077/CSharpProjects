namespace ConsoleIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            Console.Write("Enter your name: ");
            string name = Console.ReadLine();
            Console.WriteLine(name);

            Console.Write("Enter your age: ");
            string ageInput = Console.ReadLine();
            int age = Convert.ToInt32(ageInput);
            Console.WriteLine(age);

            Console.WriteLine("Your name is " + name + " and your age is " + age);

            if (ageInput == "18")
            {
                Console.WriteLine("You are 18 years old");
            }


            Console.ReadLine();
        }
    }
}