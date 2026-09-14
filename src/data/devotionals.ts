// Devocionales diarios curados por grupo de edad.
// La fecha NO vive aquí: se toma del calendario escolar vigente (src/utils/schoolCalendar.ts)
// y el devocional se rota de forma determinista por día escolar, de modo que nunca se repite
// dos días seguidos y cada estudiante recibe un versículo distinto acorde a su edad.

export interface Devocional {
  id: string;
  tema: string;
  versiculo: {
    referencia: string;
    texto: string;
    version: string;
  };
  ensenanza: string;
  oracion: string;
}

// 4.º EGB (≈ 8-10 años): lenguaje sencillo, imágenes concretas y decisiones del día a día.
export const YOUNG_DEVOTIONALS: Devocional[] = [
  {
    id: 'y-cuidado',
    tema: 'Dios me cuida',
    versiculo: { referencia: 'Salmo 23:1', texto: 'El Señor es mi pastor; tengo todo lo que necesito.', version: 'NTV' },
    ensenanza: 'Dios cuida de ti como un buen pastor cuida a sus ovejas. Aunque tengas un día difícil o una tarea que no entiendas, Él está cerca y no te deja solo. Puedes confiar en que te dará lo que necesitas.',
    oracion: 'Señor, gracias porque me cuidas cada día. Ayúdame a confiar en ti cuando algo me preocupe. Amén.',
  },
  {
    id: 'y-valentia',
    tema: 'No tengas miedo',
    versiculo: { referencia: 'Isaías 41:10', texto: 'No tengas miedo, porque yo estoy contigo; no te desalientes, porque yo soy tu Dios. Te fortaleceré y te ayudaré.', version: 'NTV' },
    ensenanza: 'Cuando algo te dé miedo —una exposición, un examen o hablar con alguien nuevo— recuerda que Dios va contigo. Él te da valentía y te ayuda a dar el primer paso.',
    oracion: 'Dios, dame valentía para hacer lo que me da miedo. Sé mi ayuda en cada momento. Amén.',
  },
  {
    id: 'y-gratitud',
    tema: 'Dar gracias',
    versiculo: { referencia: '1 Tesalonicenses 5:18', texto: 'Den gracias a Dios en toda situación, porque esta es su voluntad para ustedes en Cristo Jesús.', version: 'NTV' },
    ensenanza: 'Agradecer cambia nuestro corazón. Hoy puedes dar gracias por tu familia, tus amigos, tu comida y hasta por las cosas pequeñas. Un corazón agradecido se llena de alegría.',
    oracion: 'Padre, gracias por todo lo bueno que me das. Ayúdame a ser agradecido y a compartir mi alegría. Amén.',
  },
  {
    id: 'y-palabras',
    tema: 'Palabras amables',
    versiculo: { referencia: 'Proverbios 15:1', texto: 'La respuesta amable calma el enojo; la respuesta grosera lo enciende más.', version: 'NTV' },
    ensenanza: 'Lo que decimos puede ayudar o lastimar. Si un amigo está enojado, una palabra amable puede calmar la situación. Elige hoy hablar con respeto y cariño.',
    oracion: 'Jesús, enséñame a usar palabras amables con mi familia y mis amigos. Amén.',
  },
  {
    id: 'y-perdon',
    tema: 'Perdonar',
    versiculo: { referencia: 'Efesios 4:32', texto: 'Sean bondadosos y compasivos unos con otros, y perdónense mutuamente, así como Dios los perdonó a ustedes en Cristo.', version: 'NTV' },
    ensenanza: 'Perdonar no siempre es fácil, pero libera nuestro corazón. Cuando alguien te moleste, recuerda cuánto te perdona Dios y haz lo mismo: perdona y vive en paz.',
    oracion: 'Señor, ayúdame a perdonar como tú me perdonas. Quita de mí el enojo. Amén.',
  },
  {
    id: 'y-luz',
    tema: 'La Palabra es mi luz',
    versiculo: { referencia: 'Salmo 119:105', texto: 'Tu palabra es una lámpara que guía mis pies y una luz en mi camino.', version: 'NTV' },
    ensenanza: 'La Biblia es como una linterna en un camino oscuro: nos muestra por dónde ir. Cada vez que lees o escuchas la Palabra, Dios te enseña a elegir lo correcto.',
    oracion: 'Dios, gracias por tu Palabra. Ayúdame a escucharla y obedecerla. Amén.',
  },
  {
    id: 'y-paz',
    tema: 'Hacer las paces',
    versiculo: { referencia: 'Mateo 5:9', texto: 'Dios bendice a los que procuran la paz, pues serán llamados hijos de Dios.', version: 'NTV' },
    ensenanza: 'Ser un pacificador significa ayudar a que los demás se lleven bien y no pelear. Puedes compartir, decir cosas buenas y pedir perdón cuando te equivocas. Dios bendice a quienes buscan la paz.',
    oracion: 'Señor, hazme un constructor de paz en mi casa y en mi salón. Amén.',
  },
  {
    id: 'y-obediencia',
    tema: 'Obedecer con alegría',
    versiculo: { referencia: 'Colosenses 3:20', texto: 'Hijos, obedezcan en todo a sus padres, porque esto agrada al Señor.', version: 'NTV' },
    ensenanza: 'Obedecer a tus padres y maestros es una forma de mostrar amor y respeto. Cuando obedeces de buena gana, agradas a Dios y creces en sabiduría.',
    oracion: 'Padre, ayúdame a obedecer con buena actitud y a hacerlo con alegría. Amén.',
  },
  {
    id: 'y-amor',
    tema: 'Amar como Dios',
    versiculo: { referencia: '1 Juan 4:19', texto: 'Nosotros amamos porque él nos amó primero.', version: 'NTV' },
    ensenanza: 'Dios te amó primero, incluso antes de que hicieras algo. Ese amor es el que puedes compartir con los demás: con quien es diferente, con quien te cuesta, con quien necesita una sonrisa.',
    oracion: 'Jesús, gracias por amarme tanto. Enséñame a amar a los demás como tú. Amén.',
  },
  {
    id: 'y-verdad',
    tema: 'Decir la verdad',
    versiculo: { referencia: 'Proverbios 12:22', texto: 'El Señor odia a los mentirosos, pero se deleita en los que dicen la verdad.', version: 'NTV' },
    ensenanza: 'Decir la verdad agrada a Dios y construye confianza. Aunque a veces cueste, la verdad siempre es el mejor camino y nos deja en paz.',
    oracion: 'Dios, dame valor para decir siempre la verdad y ser honesto. Amén.',
  },
  {
    id: 'y-alegria',
    tema: 'La alegría de este día',
    versiculo: { referencia: 'Salmo 118:24', texto: 'Este es el día que hizo el Señor; ¡alegrémonos y regocijémonos en él!', version: 'NTV' },
    ensenanza: 'Cada día es un regalo de Dios. Hoy puedes elegir sonreír, aprender con ganas y disfrutar a las personas que te rodean. La alegría también es una forma de agradecer.',
    oracion: 'Señor, gracias por este día. Llena mi corazón de alegría y compártela con otros. Amén.',
  },
  {
    id: 'y-fruto',
    tema: 'El fruto del Espíritu',
    versiculo: { referencia: 'Gálatas 5:22', texto: 'El fruto del Espíritu es amor, alegría, paz, paciencia, amabilidad, bondad y fidelidad.', version: 'NTV' },
    ensenanza: 'Cuando dejas que Dios guíe tu corazón, tu vida da buenos frutos. Hoy puedes practicar uno: ser paciente, amable o fiel en lo que haces.',
    oracion: 'Espíritu Santo, produce en mí buenos frutos y ayúdame a ser mejor cada día. Amén.',
  },
  {
    id: 'y-regla',
    tema: 'La regla de oro',
    versiculo: { referencia: 'Mateo 7:12', texto: 'Haz a los demás todo lo que quieras que te hagan a ti.', version: 'NTV' },
    ensenanza: 'Antes de actuar, pregúntate: ¿me gustaría que me hicieran esto a mí? Trata a tus compañeros con el respeto y el cariño con que quieres ser tratado.',
    oracion: 'Jesús, ayúdame a tratar a los demás como quiero que me traten. Amén.',
  },
  {
    id: 'y-unico',
    tema: 'Dios me hizo único',
    versiculo: { referencia: 'Salmo 139:14', texto: 'Te alabaré, porque soy una creación admirable.', version: 'NTV' },
    ensenanza: 'Dios te hizo único y especial, con tus talentos y tu forma de ser. No necesitas ser igual a nadie: puedes agradar a Dios siendo tú mismo y dando lo mejor de ti.',
    oracion: 'Gracias, Dios, porque me hiciste único. Ayúdame a valorar a los demás como a mí mismo. Amén.',
  },
  {
    id: 'y-ayudar',
    tema: 'Ayudar a los demás',
    versiculo: { referencia: 'Hebreos 13:16', texto: 'No se olviden de hacer el bien y de compartir con otros, porque esos son los sacrificios que agradan a Dios.', version: 'NTV' },
    ensenanza: 'Ayudar a alguien —prestar un lápiz, acompañar a un amigo triste o colaborar en casa— agrada a Dios. Los pequeños actos de bondad cambian el día de las personas.',
    oracion: 'Señor, abre mis ojos para ver a quien necesita ayuda y dame ganas de servir. Amén.',
  },
  {
    id: 'y-paciencia',
    tema: 'Tener paciencia',
    versiculo: { referencia: 'Proverbios 14:29', texto: 'El que es paciente muestra gran entendimiento; el que es impaciente demuestra su necedad.', version: 'NTV' },
    ensenanza: 'La paciencia es esperar sin enojarse. Cuando esperas tu turno, cuando algo te sale lento o cuando repites un ejercicio, estás creciendo en sabiduría.',
    oracion: 'Dios, dame paciencia para esperar y para no enojarme. Amén.',
  },
];

// 8.º EGB (≈ 11-13 años): temas de identidad, propósito, amistad, disciplina e influencia digital.
export const TEEN_DEVOTIONALS: Devocional[] = [
  {
    id: 't-proposito',
    tema: 'Dios tiene un plan para ti',
    versiculo: { referencia: 'Jeremías 29:11', texto: 'Yo sé los planes que tengo para ustedes: planes para lo bueno y no para lo malo, para darles un futuro lleno de esperanza.', version: 'NTV' },
    ensenanza: 'Puede que hoy no tengas claro qué serás de grande, pero Dios sí. Él está formando tu carácter en cada materia, cada amistad y cada decisión. Confía en que tu historia tiene propósito.',
    oracion: 'Señor, ayúdame a confiar en tus planes para mi vida y a dar pasos firmes hoy. Amén.',
  },
  {
    id: 't-identidad',
    tema: 'Una mente renovada',
    versiculo: { referencia: 'Romanos 12:2', texto: 'No imiten las conductas ni las costumbres de este mundo; más bien, dejen que Dios los transforme al cambiarles la manera de pensar.', version: 'NTV' },
    ensenanza: 'El mundo te dice que vales por tu apariencia, tus seguidores o tus notas. Dios te dice que vales por quién eres en Él. Llena tu mente de la verdad de Dios y no de lo que otros opinan.',
    oracion: 'Padre, renueva mi manera de pensar y líbrame de buscar la aprobación de los demás. Amén.',
  },
  {
    id: 't-sabiduria',
    tema: 'Pedir sabiduría',
    versiculo: { referencia: 'Santiago 1:5', texto: 'Si necesitan sabiduría, pídansela a nuestro generoso Dios, y él se la dará; no los reprenderá por pedirla.', version: 'NTV' },
    ensenanza: 'Ante una decisión difícil —una amistad, un examen, una tentación— no tienes que inventar la respuesta solo. Pídela a Dios con fe; Él promete darla generosamente.',
    oracion: 'Dios, dame sabiduría para este día y para las decisiones que debo tomar. Amén.',
  },
  {
    id: 't-ansiedad',
    tema: 'Cambiar la ansiedad por oración',
    versiculo: { referencia: 'Filipenses 4:6-7', texto: 'No se preocupen por nada; en cambio, oren por todo. Díganle a Dios lo que necesitan y denle gracias. Así experimentarán la paz de Dios, que supera todo lo que podemos entender.', version: 'NTV' },
    ensenanza: 'La ansiedad se alimenta de pensamientos que giran una y otra vez. La oración te invita a entregar esas cargas a Dios y a recibir una paz que no depende de que todo esté resuelto.',
    oracion: 'Señor, entrego mis preocupaciones en tus manos. Dame tu paz y enséñame a confiar. Amén.',
  },
  {
    id: 't-excelencia',
    tema: 'Hacer todo para el Señor',
    versiculo: { referencia: 'Colosenses 3:23', texto: 'Trabajen de buena gana en todo lo que hagan, como si fuera para el Señor y no para la gente.', version: 'NTV' },
    ensenanza: 'Estudiar, ayudar en casa o preparar un proyecto no es solo para la nota. Cuando trabajas con excelencia, lo haces como ofrenda a Dios. El esfuerzo honesto honra al Creador.',
    oracion: 'Jesús, hazme diligente y honesto en cada tarea, para tu gloria. Amén.',
  },
  {
    id: 't-valentia',
    tema: 'Poder, amor y dominio propio',
    versiculo: { referencia: '2 Timoteo 1:7', texto: 'Dios no nos ha dado un espíritu de timidez, sino de poder, de amor y de dominio propio.', version: 'NTV' },
    ensenanza: 'Ser valiente no es no tener miedo, sino hacer lo correcto a pesar de él. Dios te da poder para defender lo justo, amor para tratar bien a otros y dominio propio para decir “no” a lo que te daña.',
    oracion: 'Dios, dame valentía, amor y autocontrol para actuar con integridad hoy. Amén.',
  },
  {
    id: 't-amistad',
    tema: 'La fuerza de la amistad',
    versiculo: { referencia: 'Eclesiastés 4:9-10', texto: 'Dos personas pueden lograr más que una sola, porque obtienen mejores resultados. Si una cae, la otra la levanta.', version: 'NTV' },
    ensenanza: 'Dios nos creó para acompañarnos. Un buen amigo te anima a crecer y te levanta cuando fallas. Sé ese amigo: el que escucha, el que no traiciona y el que dice la verdad con cariño.',
    oracion: 'Señor, dame amigos que te amen y hazme un amigo fiel para los demás. Amén.',
  },
  {
    id: 't-esperanza',
    tema: 'Paciencia y esperanza',
    versiculo: { referencia: 'Romanos 12:12', texto: 'Alégrense en la esperanza, sean pacientes en el sufrimiento y no dejen de orar.', version: 'NTV' },
    ensenanza: 'Habrá días difíciles: una materia que no entiendes, un plan que se frustra. La esperanza no es ignorar el problema, sino saber que Dios sigue obrando y que no estás solo.',
    oracion: 'Padre, dame esperanza y paciencia en los momentos difíciles, y enséñame a no dejar de orar. Amén.',
  },
  {
    id: 't-luz',
    tema: 'Ser luz en tu entorno',
    versiculo: { referencia: 'Mateo 5:14-16', texto: 'Ustedes son la luz del mundo. Dejen que sus buenas acciones brillen a la vista de todos, para que todos alaben a su Padre celestial.', version: 'NTV' },
    ensenanza: 'Tu forma de hablar, publicar y tratar a otros deja una huella. No sigas la corriente de lo que todos hacen: elige lo bueno y tu ejemplo iluminará a quienes te rodean.',
    oracion: 'Señor, que mis acciones y mis palabras sean luz que te honre. Amén.',
  },
  {
    id: 't-integridad',
    tema: 'Defender la verdad con respeto',
    versiculo: { referencia: '1 Pedro 3:15', texto: 'Adoren a Cristo como a su Señor. Estén siempre preparados para dar respuesta de su fe, pero háganlo con gentileza y respeto.', version: 'NTV' },
    ensenanza: 'No se trata de ganar discusiones, sino de vivir con integridad. Si alguien cuestiona tu fe o tus valores, responde con amabilidad y coherencia, sin burlarte ni imponerte.',
    oracion: 'Jesús, dame convicción y gentileza para defender lo que creo. Amén.',
  },
  {
    id: 't-corazon',
    tema: 'Cuida tu corazón',
    versiculo: { referencia: 'Proverbios 4:23', texto: 'Sobre todas las cosas cuida tu corazón, porque de él brota la vida.', version: 'NTV' },
    ensenanza: 'Lo que ves, escuchas y sigues forma tu corazón. Las redes y las series influyen más de lo que crees. Elige con cuidado lo que alimenta tu mente y tus afectos.',
    oracion: 'Dios, ayúdame a cuidar mi corazón y a elegir lo que me acerca a ti. Amén.',
  },
  {
    id: 't-justicia',
    tema: 'Justicia, misericordia y humildad',
    versiculo: { referencia: 'Miqueas 6:8', texto: 'El Señor ya te ha dicho lo que es bueno y lo que él espera de ti: que hagas lo justo, que ames la misericordia y que camines humildemente con tu Dios.', version: 'NTV' },
    ensenanza: 'Dios no busca discursos grandiosos, sino una vida coherente: tratar con justicia, tener compasión por quien sufre y vivir con humildad. Eso se ve en lo pequeño, no solo en lo grande.',
    oracion: 'Señor, que sea justo, misericordioso y humilde en mis decisiones de hoy. Amén.',
  },
  {
    id: 't-disciplina',
    tema: 'Sabiduría y disciplina',
    versiculo: { referencia: 'Proverbios 1:7', texto: 'El temor del Señor es el principio del conocimiento; los necios desprecian la sabiduría y la disciplina.', version: 'NTV' },
    ensenanza: 'La disciplina de hoy —estudiar a tiempo, cumplir lo prometido, cuidar tu cuerpo— construye tu futuro. Aceptar corrección y esforzarte no es debilidad, es sabiduría.',
    oracion: 'Dios, dame disciplina y humildad para aprender y corregirme. Amén.',
  },
  {
    id: 't-gozo',
    tema: 'Deleite en el Señor',
    versiculo: { referencia: 'Salmo 37:4', texto: 'Deléitate en el Señor, y él te dará lo que más deseas.', version: 'NTV' },
    ensenanza: 'Cuando Dios ocupa el primer lugar, tus deseos se van alineando con los suyos. No es que obtengas todo lo que quieres, sino que aprendes a querer lo que te hace bien.',
    oracion: 'Señor, sé mi mayor alegría; ordena mis deseos según tu voluntad. Amén.',
  },
  {
    id: 't-fuerza',
    tema: 'Fuerzas renovadas',
    versiculo: { referencia: 'Isaías 40:31', texto: 'Los que confían en el Señor renovarán sus fuerzas; volarán como las águilas, correrán y no se cansarán.', version: 'NTV' },
    ensenanza: 'El cansancio —físico o mental— es real. Dios promete renovar a quienes confían en Él. Descansar en Él no es rendirse: es recargar fuerzas para seguir bien.',
    oracion: 'Dios fiel, renueva mis fuerzas para terminar bien esta semana. Amén.',
  },
  {
    id: 't-mayordomia',
    tema: 'Todo para la gloria de Dios',
    versiculo: { referencia: '1 Corintios 10:31', texto: 'Tanto si comen como si beben, o hagan lo que hagan, háganlo todo para la gloria de Dios.', version: 'NTV' },
    ensenanza: 'Hasta lo cotidiano puede tener sentido eterno: comer, entrenar, estudiar o descansar. La mayordomía es cuidar lo que Dios te dio —tiempo, cuerpo, talentos— y usarlo para el bien.',
    oracion: 'Señor, que todo lo que haga hoy te honre y sirva a los demás. Amén.',
  },
];

export const getDevotionalPool = (age: number): Devocional[] =>
  age <= 10 ? YOUNG_DEVOTIONALS : TEEN_DEVOTIONALS;

// Semillas fijas y distintas (módulo el tamaño del repertorio) para los perfiles conocidos, de modo
// que dos estudiantes de la misma edad no reciban el mismo devocional el mismo día.
const KNOWN_DEVOTIONAL_SEEDS: Record<string, number> = {
  avril: 1,
  karen: 5,
  gael: 9,
  mauricio: 13,
};

/** Semilla estable por estudiante para que dos hermanos de la misma edad no reciban el mismo devocional el mismo día. */
export const studentDevotionalSeed = (studentId: string): number => {
  if (studentId in KNOWN_DEVOTIONAL_SEEDS) return KNOWN_DEVOTIONAL_SEEDS[studentId];
  let hash = 0;
  for (let i = 0; i < studentId.length; i++) hash = (hash * 31 + studentId.charCodeAt(i)) >>> 0;
  return hash;
};
