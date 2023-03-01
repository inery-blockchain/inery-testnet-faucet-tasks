package main

import (
	"fmt"
	"os/exec"
)

func main() {
	cmd := exec.Command("python", "/path/to/file.py")
	output, err := cmd.Output()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(output))
}
