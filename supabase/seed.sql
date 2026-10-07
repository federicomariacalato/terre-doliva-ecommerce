-- Initial product catalog, imported from src/data/products.json.
-- Run in the Supabase SQL Editor after creating the products table.
insert into public.products (id, name, price, description, category, image) values
  (1, 'Olio Extra Vergine di Oliva - Monocultivar', 18.50, 'Estratto a freddo da olive 100% italiane di un''unica varietà selezionata. Un profilo aromatico complesso con spiccate note di carciofo fresco, erba tagliata e mandorla amara. Ideale a crudo su carni rosse, zuppe calde e bruschette.', 'Olio EVOO', '/products/1-monocultivar.jpg'),
  (2, 'Olio EVOO Biologico - Blend Frantoio', 22.00, 'Certificato biologico e molito entro sole 4 ore dalla raccolta per preservare tutti i polifenoli. Gusto armonioso ed equilibrato, con un fruttato medio che dona eleganza e delicatezza a insalate, verdure grigliate e pesce.', 'Olio EVOO', '/products/2-biologico-blend.jpg'),
  (3, 'Paté di Olive Nere Leccine', 6.50, 'Cremosa specialità artigianale ottenuta esclusivamente da olive nere Leccine mature, lavorate lentamente con l''aggiunta del nostro miglior olio extravergine. Perfetto per crostini caldi, aperitivi raffinati e per insaporire primi piatti.', 'Conserve', '/products/3-pate-olive-nere.jpg'),
  (5, 'Olio EVOO Aromatizzato al Limone del Gargano', 12.50, 'Prodotto per frangitura contemporanea di olive e limoni freschi a km 0. Fragrante e agrumato, straordinario su carpacci di pesce, insalate estive e verdure al vapore.', 'Oli Aromatizzati', '/products/5-limone.jpg'),
  (6, 'Olio EVOO Aromatizzato al Peperoncino Piccante', 12.50, 'Infusione naturale di peperoncini selezionati nel nostro olio extravergine. Piccantezza decisa ma avvolgente, perfetto per impreziosire zuppe di legumi, pizze e primi piatti.', 'Oli Aromatizzati', '/products/6-peperoncino.jpg'),
  (7, 'Pomodori Secchi Artigianali in Olio EVOO', 7.80, 'Pomodori maturati al sole, essiccati lentamente all''aria aperta e invasati a mano con capperi, origano e il nostro olio extravergine d''oliva. Un classico intramontabile.', 'Conserve', '/products/7-pomodori-secchi.jpg'),
  (8, 'Carciofini Interi Spaccati alla Brace', 8.90, 'Cuori di carciofo tenerissimi, grigliati leggermente sui carboni ardenti per donare una nota affumicata unica, poi conservati nel nostro olio d''oliva premium.', 'Conserve', '/products/8-carciofini.jpg'),
  (9, 'Miele di Sulla delle Colline Locali', 9.50, 'Miele biologico dal sapore delicato, quasi floreale, con una nota finale tipicamente agrumata. Cristallizzazione finissima, splendido in abbinamento a formaggi stagionati.', 'Specialità', '/products/9-miele.jpg'),
  (10, 'Tarallini Artigianali Scaldati all''Olio EVOO', 4.20, 'Prodotti secondo la ricetta tradizionale con farina di grano tenero tipo 0, vino bianco e il 20% del nostro olio extravergine. Croccanti, friabili e irresistibili.', 'Specialità', '/products/10-tarallini.jpg');

-- Ids were inserted explicitly, so move the identity counter past them:
-- products added later get the next free id instead of colliding with 1.
select setval(
  pg_get_serial_sequence('public.products', 'id'),
  (select max(id) from public.products)
);
