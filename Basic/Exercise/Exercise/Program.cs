namespace Exercises
{
    class Program
    {
        /*
         * Create $ initialise two ints
         * Make a variable to work out remainder
         * output remainder to the screen
         * Change the first int variable to another number
         *  * and recalculate the remainder
         *  * output new remainder to the screen
         */

        static void Main(string[] args)
        {
            int num1 = 11;
            int num2 = 2;
            int remainder = num1 % num2;

            Console.WriteLine(remainder);
            
            num1 = 13;
            remainder = num1 % num2;
            Console.WriteLine(remainder);
            
            Console.ReadLine();
        }
    }
}