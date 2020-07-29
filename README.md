# Fionna

Fionna é um bot simples feito em base de [`discord.js`](https://discord.js.org/), têm muita coisa pra mudar ainda mas espero que juntos consigamos melhorá-la.

exemplo de código: ```js
let user = message.author;
let money = client.currency.fetchMoney(user.id).balance;

client.currency.removeMoney(user.id, money - (client.currency.fetchMoney(user.id).balance / 2));
return message.channel.send(`Metade do dinheiro de ${user.username} foi removido com sucesso!`);
```

na primeira linha, nós declaramos o usuário.
na segunda, declaramos que o dinheiro deve ser chamado.
na penúltima, tiramos metade do dinheiro do usuário (pode ser feito de outras formas).
na última, a Fionna (a.k.a. BOT) manda uma mensagem no canal em que o comando foi utilizado, dizendo que metade do dinheiro foi removido.

Mas claro, é só um exemplo.
