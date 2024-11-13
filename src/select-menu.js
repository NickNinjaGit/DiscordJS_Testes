const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");



module.exports = {

     
    

    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId("starter")
            .setPlaceholder("Escolha seu inicial!")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Bulbasaur")
                    .setDescription("Tipo grama/venenoso")
                    .setEmoji("🍃")
                    .setValue("Bulbasaur"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Squirtle")
                    .setDescription("Tipo água puro")
                    .setEmoji("💧")
                    .setValue("Squirtle"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Charmander")
                    .setDescription("Tipo fogo puro")
                    .setEmoji("🔥")
                    .setValue("Charmander")
            );

        const row = new ActionRowBuilder().addComponents(select);
        const starters = new EmbedBuilder().setImage("https://gameranx.com/wp-content/uploads/2020/02/PokemonG1Starters.jpg")

      

        // Envia a mensagem inicial com o menu de seleção e o retrato padrão
        await interaction.reply({
            content: "> # Escolha seu Inicial!",
            components: [row],
            embeds: [starters]
        });
    },
};
