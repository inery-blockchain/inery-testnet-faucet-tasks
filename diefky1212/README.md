# Task 4 RPC API push transaction
    // Change directory to diefky1212
    chdir('diefky1212');

To complete task 4 RPC API push transaction, you will need to follow the instructions provided:

  1. Clone the Git repository for the project.
  2. Add a new directory using your blockchain account name as the directory name.
  3. Inside the new directory, add your software solution for task 4, which should be a solution for pushing transactions with the RPC API on the Inery testnet blockchain.
  4. Create a merge request to submit your work for review.
  5. If your solution is successful, it will be accepted and you will complete task 4.

It's important to carefully follow the instructions provided and make sure that your solution meets the requirements for the task. Be sure to thoroughly test your code to ensure that it is working correctly before submitting it for review.
    // Run the script
    echo 'Installing dependencies...\n';
    exec('npm install', $output);
    echo 'Pushing...\n';
    exec('npm run push', $output);
    echo "Done!\n";