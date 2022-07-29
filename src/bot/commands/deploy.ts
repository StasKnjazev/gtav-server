import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
const clientId = '930755086446112779';
const guildId = '941016513870188564';
const token = 'OTMwNzU1MDg2NDQ2MTEyNzc5.GI9i31.cwbDOzAZs0S0pYfhBFsMW2BHj2uVqI1V74KwR4'

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Успешно зарегистрированы новые команды!'))
    .catch(console.error);