    // Change directory to arayungli
    chdir('arayungli');

    // Run the script
    echo 'Installing dependencies...\n';
    exec('npm install', $output);
    echo 'Pushing...\n';
    exec('npm run push', $output);
    echo "Done!\n";