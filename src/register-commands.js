require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        cooldown: 5,
        name: "add",
        description: "Adds to numbers.",
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        
                        name: 'three',
                        value: 3,
                    
                    }
                ],
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
      
    },
    {
        name: 'embed',
        description: 'funcionou'
    },
    {
        name: 'button',
        description: 'Botão'
    },
    {
        name: 'select-menu',
        description: 'Select Menu'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {
    try {
        console.log("Registrando Slash Commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        );

        console.log("Comandos registrados!");
    } catch (error) {
        console.log(`Ocorreu um erro: ${error}`);
    }
})();
