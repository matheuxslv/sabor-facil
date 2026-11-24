// receitas que entram no banco na primeira vez que a API roda
module.exports = [
  {
    nome: 'Brigadeiro',
    categoria: 'doce',
    ingredientes: [
      '1 lata de leite condensado',
      '1 colher (sopa) de manteiga',
      '3 colheres (sopa) de chocolate em pó',
      'Chocolate granulado para enrolar'
    ],
    modoPreparo:
      'Coloque o leite condensado, a manteiga e o chocolate em pó em uma panela.\n' +
      'Cozinhe em fogo baixo, mexendo sempre, até a massa desgrudar do fundo da panela.\n' +
      'Deixe esfriar, faça bolinhas com as mãos untadas e passe no granulado.',
    tempoPreparo: 30,
    porcoes: 20,
    autor: 'Radmila',
    status: 'aprovada'
  },
  {
    nome: 'Bolo de cenoura',
    categoria: 'doce',
    ingredientes: [
      '3 cenouras médias',
      '3 ovos',
      '1 xícara de óleo',
      '2 xícaras de açúcar',
      '2 xícaras de farinha de trigo',
      '1 colher (sopa) de fermento em pó'
    ],
    modoPreparo:
      'Bata no liquidificador as cenouras, os ovos e o óleo.\n' +
      'Em uma tigela, misture o creme com o açúcar e a farinha.\n' +
      'Por último, acrescente o fermento e misture devagar.\n' +
      'Asse em forma untada no forno a 180 °C por cerca de 40 minutos.',
    tempoPreparo: 60,
    porcoes: 12,
    autor: 'Isadora',
    status: 'aprovada'
  },
  {
    nome: 'Pão de queijo',
    categoria: 'salgado',
    ingredientes: [
      '500 g de polvilho azedo',
      '1 xícara de leite',
      '1/2 xícara de óleo',
      '2 ovos',
      '200 g de queijo meia cura ralado',
      '1 colher (chá) de sal'
    ],
    modoPreparo:
      'Ferva o leite com o óleo e o sal e despeje sobre o polvilho, misturando bem.\n' +
      'Espere amornar e junte os ovos e o queijo, sovando até ficar uma massa lisa.\n' +
      'Faça bolinhas e asse a 200 °C por cerca de 25 minutos.',
    tempoPreparo: 50,
    porcoes: 30,
    autor: 'Matheus',
    status: 'aprovada'
  },
  {
    nome: 'Omelete simples',
    categoria: 'salgado',
    ingredientes: [
      '2 ovos',
      '1 fatia de queijo picada',
      '1 fatia de presunto picada',
      'Sal e orégano a gosto',
      '1 colher (chá) de manteiga'
    ],
    modoPreparo:
      'Bata os ovos com o sal.\n' +
      'Derreta a manteiga em uma frigideira e despeje os ovos.\n' +
      'Coloque o queijo e o presunto, dobre a omelete ao meio e deixe dourar dos dois lados.',
    tempoPreparo: 10,
    porcoes: 1,
    autor: 'Mikelly',
    status: 'aprovada'
  },
  {
    nome: 'Limonada suíça',
    categoria: 'bebida',
    ingredientes: [
      '2 limões',
      '1 litro de água gelada',
      '4 colheres (sopa) de açúcar',
      'Gelo a gosto'
    ],
    modoPreparo:
      'Lave bem os limões e corte em quatro, tirando o miolo branco.\n' +
      'Bata no liquidificador com a água e o açúcar por poucos segundos.\n' +
      'Coe e sirva com gelo.',
    tempoPreparo: 10,
    porcoes: 4,
    autor: 'Júlia',
    status: 'aprovada'
  },
  {
    nome: 'Suco de laranja com cenoura',
    categoria: 'bebida',
    ingredientes: [
      '4 laranjas',
      '1 cenoura pequena',
      '300 ml de água gelada',
      'Açúcar a gosto'
    ],
    modoPreparo:
      'Esprema as laranjas.\n' +
      'Bata o suco no liquidificador com a cenoura picada e a água.\n' +
      'Adoce se quiser e sirva gelado.',
    tempoPreparo: 10,
    porcoes: 3,
    autor: 'Júlia',
    status: 'aprovada'
  },
  {
    nome: 'Mousse de maracujá',
    categoria: 'doce',
    ingredientes: [
      '1 lata de leite condensado',
      '1 caixa de creme de leite',
      '1 xícara de suco concentrado de maracujá'
    ],
    modoPreparo:
      'Bata tudo no liquidificador por 3 minutos.\n' +
      'Coloque em uma travessa e leve à geladeira por pelo menos 3 horas.',
    tempoPreparo: 15,
    porcoes: 6,
    autor: 'Mikelly',
    status: 'pendente'
  }
];
