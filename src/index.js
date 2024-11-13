// Importa o dotenv para puxar as váriaveis de ambiente do arquivo .env
require("dotenv").config();


// Importa algumas classes do Discord.js
const { Client, Events, IntentsBitField, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, DiscordAPIError} = require("discord.js");
const Sequelize  = require('sequelize');
const s_menu = require("./select-menu")
const path = require("path")
const block_list = []
// Cria um novo Client que especifica as intents que o bot pode usar
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
})



async function ensureRoleExists(guild, roleName, roleData) {
	let role = guild.roles.cache.find(role => role.name === roleName)

	if (!role) {
		try {
			role = await guild.roles.create({
				name: roleName,
				...roleData,
			});
			console.log(`Cargo criado ${role.name}`)
		} catch (error) {
			console.error(`Erro ao criar o cargo ${roleName}`, error)
		}

	} else {
		console.log(`O cargo ${roleName} já existe`)
	}

	return role;
}



client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (guild) {
        // Dados do cargo que queremos garantir a existência
        const Azul = {
			name: "Azul",
            color: "Blue",
            permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.KickMembers],
            reason: 'porque azul é minha cor favorita',
        };

		const Verde = {
			name: "Verde",
			color: "Green"
		}
        // Verifica e cria o cargo "Azul" se necessário
        await ensureRoleExists(guild, Azul.name, Azul);
		await ensureRoleExists(guild, Verde.name, Verde);
    } else {
        console.log("Servidor não encontrado.");
    }

});


client.on('interactionCreate', async (interaction) => {
    // Tratamento para botões
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case "button1":
                const embed = new EmbedBuilder()
                    .setTitle("Titulo")
                    .setDescription("Descrição da Embed")
                    .setColor('Random')
                    .addFields(
                        { name: 'Campo 1', value: 'Algum valor', inline: true },
                        { name: 'Campo 2', value: 'Algum valor 2', inline: true },
                        { name: 'Campo 3', value: 'Algum valor 3', inline: true },
                        { name: 'Zona 1', value: 'Algum valor 2', inline: false },
                        { name: 'Campo 2', value: 'Zona 2', inline: false }
                    )
                    .setImage("https://i0.wp.com/ovicio.com.br/wp-content/uploads/2021/07/20210712-one-piece-zoro-wano-postcover.jpg?resize=555%2C555&ssl=1");
                
                await interaction.reply({ embeds: [embed] });
                break;

            case "button2":
                await interaction.reply({
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId("SKU")
                                .setLabel("Botão dentro de Botão kkkkk")
                                .setStyle(ButtonStyle.Success)
                        )
                    ]
                });
                break;

            case "SKU":
                await interaction.deferReply(); // Defer para processamento assíncrono
                await interaction.deleteReply(); // Exclui a resposta deferida
                await interaction.channel.send("OPA!");
                break;
        }
    }

    // Tratamento para o Select Menu
    else if (interaction.isStringSelectMenu()) {   
        if (interaction.customId === "starter") {
			 

			const squirtleImage = new AttachmentBuilder(path.join(__dirname, 'img', 'squirtle.png' ), {name: 'squirtle.png'})

            const selectedValue = interaction.values[0];
			 const portraits = {
            Bulbasaur: new EmbedBuilder()
			.setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f619ed0-b566-4538-8392-bf02ca7a76cd/dck5gwi-22a4dd16-2323-43b2-8aa2-e16998886274.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFmNjE5ZWQwLWI1NjYtNDUzOC04MzkyLWJmMDJjYTdhNzZjZFwvZGNrNWd3aS0yMmE0ZGQxNi0yMzIzLTQzYjItOGFhMi1lMTY5OTg4ODYyNzQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hOiarMI0As9KfBe9MnTLrRtSd8HHf1LMXz_sr--iHIQ")
            .setColor(0x2b8a36),
			Squirtle: new EmbedBuilder()
			.setImage('attachment://squirtle.png')
			.setColor(0x2b5f8a),
            Chamander: new EmbedBuilder()
			.setImage("https://www.schemecolor.com/wp-content/uploads/Charmander.png")
			.setColor(0xc26523)
    		};
			if(selectedValue === "Bulbasaur")
			{
				interaction.reply({
					content: `Você escolheu o ${selectedValue}!`,
					embeds: [portraits.Bulbasaur],
				})
			}
			if(selectedValue === "Squirtle")
			{
				interaction.reply({
					content: `Você escolheu o ${selectedValue}!`,
					embeds: [portraits.Squirtle],
					files: [squirtleImage]
				})
			}
			if(selectedValue === "Charmander")
			{
				interaction.reply({
					content: `Você escolheu o ${selectedValue}!`,
					embeds: [portraits.Chamander]
				})
			}
            
        }
    }

    // Tratamento para comandos de barra
    else if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case "add":
                const num1 = interaction.options.get('first-number').value;
                const num2 = interaction.options.get('second-number').value;
                await interaction.reply(`A soma é ${num1 + num2}`);
                break;

            case "embed":
                const embed = new EmbedBuilder()
                    .setTitle("Titulo")
                    .setDescription("Descrição da Embed")
                    .setColor('Random')
                    .addFields(
                        { name: 'Campo 1', value: 'Algum valor', inline: true },
                        { name: 'Campo 2', value: 'Algum valor 2', inline: true },
                        { name: 'Campo 3', value: 'Algum valor 3', inline: true },
                        { name: 'Zona 1', value: 'Algum valor 2', inline: false },
                        { name: 'Campo 2', value: 'Zona 2', inline: false }
                    )
                    .setImage("https://i0.wp.com/ovicio.com.br/wp-content/uploads/2021/07/20210712-one-piece-zoro-wano-postcover.jpg?resize=555%2C555&ssl=1");

                await interaction.reply({ embeds: [embed] });
                break;

            case "button":
                await interaction.reply({
                    content: 'Botões!',
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId("button1")
                                .setLabel("Botão 1")
                                .setEmoji("🔥")
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId("button2")
                                .setLabel("Botão 2")
                                .setEmoji("🔥")
                                .setStyle(ButtonStyle.Secondary)
                        ),
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setLabel("Clique em mim!")
                                .setEmoji("💧")
                                .setStyle(ButtonStyle.Link)
                                .setURL("https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran")
                        )
                    ]
                });
                break;

            case "select-menu":
				
				const user_id = interaction.user.id

				if(block_list.includes(user_id))
				{
					return interaction.reply("Você já utilizou este comando!")
				}
				else {
					await s_menu.execute(interaction);
					
					block_list.push(user_id)
					console.log(block_list)
            	break;
				}   
        }
    }
});


client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Ignora mensagens de outros bots

    if (message.content === '!embed') {
        const embed = new EmbedBuilder()
            .setTitle("Titulo")
            .setDescription("Descrição da Embed")
            .setColor('Random')
            .addFields(
                { name: 'Campo 1', value: 'Algum valor', inline: true }, 
                { name: 'Campo 2', value: 'Algum valor 2', inline: true }, 
                { name: 'Campo 3', value: 'Algum valor 3', inline: true }
            )
            .addFields(
                { name: 'Zona 1', value: 'Algum valor 2', inline: false }, 
                { name: 'Campo 2', value: 'Zona 2', inline: false }
            )
            .setImage("https://i0.wp.com/ovicio.com.br/wp-content/uploads/2021/07/20210712-one-piece-zoro-wano-postcover.jpg?resize=555%2C555&ssl=1");

        message.channel.send({ embeds: [embed] });
    }

	if(message.content === "!buttons") {
		message.channel.send({
		content: "Hello World",
		components: [
			new ActionRowBuilder().setComponents(
				new ButtonBuilder()
				.setCustomId("button")
				.setLabel("Clique em mim!")
				.setEmoji("🔥")
				.setStyle(ButtonStyle.Primary)
			),
			new ActionRowBuilder().setComponents(
				new ButtonBuilder()
				.setLabel("Clique em mim!")
				.setEmoji("💧")
				.setStyle(ButtonStyle.Link)
				.setURL("https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran")
			)
		]})
	}
});


// Inicia o bot a partir do TOKEN passado no arquivo .env
client.login(process.env.TOKEN);
