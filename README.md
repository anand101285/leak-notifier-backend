# Introduction

TODO: Backend will be connected to proxmox server and UI server. some details will be fetched from proxmox and modified data will be send to UI.

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

TODO: Describe and show how to build your code and run the tests.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

-   [ASP.NET Core](https://github.com/aspnet/Home)
-   [Visual Studio Code](https://github.com/Microsoft/vscode)
-   [Chakra Core](https://github.com/Microsoft/ChakraCore)

# Proxmox Configuration

-   Proxmox URL IP is not statically set hence it can be changed, user have to modify it in .env.development if it is changed

# Proxmox VM vlan Configuration

-   Dont have to configure vlan Id on network level user have to take care of it himself.
-   if user does not give vlanId by default the clone configuration will be used
