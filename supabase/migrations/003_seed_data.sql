insert into public.wedding_config (
  id,
  partner_1_name,
  partner_2_name,
  wedding_date,
  venue_name,
  venue_address,
  venue_maps_url,
  rsvp_deadline,
  welcome_message,
  dress_code,
  is_active
) values (
  '11111111-1111-1111-1111-111111111111',
  'Anina',
  'Robin',
  '2026-11-03T14:00:00+01:00',
  'Gutshof am See',
  'Seestrasse 24, 14467 Potsdam',
  'https://www.openstreetmap.org/search?query=Seestrasse%2024%2C%2014467%20Potsdam',
  '2026-10-01T23:59:59+02:00',
  'Wir freuen uns sehr, diesen Tag mit euch zu feiern. Bitte gebt uns kurz Rueckmeldung.',
  'Festlich und entspannt',
  true
) on conflict (id) do nothing;

insert into public.program_items (config_id, time_label, title, description, icon, sort_order) values
  ('11111111-1111-1111-1111-111111111111', '11:00', 'Standesamt', 'Offizielle Trauung im kleinen Kreis.', 'CalendarHeart', 1),
  ('11111111-1111-1111-1111-111111111111', '13:00', 'Sektempfang', 'Gemeinsames Anstossen und erste Glueckwuensche.', 'GlassWater', 2),
  ('11111111-1111-1111-1111-111111111111', '15:00', 'Freie Trauung', 'Zeremonie unter freiem Himmel.', 'Heart', 3),
  ('11111111-1111-1111-1111-111111111111', '18:00', 'Dinner', 'Abendessen und Reden.', 'UtensilsCrossed', 4),
  ('11111111-1111-1111-1111-111111111111', '20:00', 'Party', 'Musik, Tanz und offene Bar.', 'Music4', 5),
  ('11111111-1111-1111-1111-111111111111', '23:30', 'Mitternachtssnack', 'Staerkung fuer die letzte Tanzrunde.', 'Sparkles', 6);

insert into public.faq_items (config_id, question, answer, sort_order) values
  ('11111111-1111-1111-1111-111111111111', 'Gibt es einen Dresscode?', 'Ja. Bitte kommt festlich, aber so, dass ihr euch den ganzen Tag wohl fuehlt.', 1),
  ('11111111-1111-1111-1111-111111111111', 'Gibt es Parkplaetze?', 'Ja, direkt an der Location und in unmittelbarer Naehe.', 2),
  ('11111111-1111-1111-1111-111111111111', 'Sind Kinder willkommen?', 'Ja, wir freuen uns auch ueber unsere kleinen Gaeste.', 3),
  ('11111111-1111-1111-1111-111111111111', 'Habt ihr einen Geschenkewunsch?', 'Eure Anwesenheit ist das groesste Geschenk. Wer moechte, kann uns bei unseren Reiseplaenen unterstuetzen.', 4);

insert into public.rsvps (
  config_id,
  guest_name,
  guest_email,
  is_attending,
  plus_one,
  plus_one_name,
  total_guests,
  menu_choice,
  dietary_notes,
  message
) values
  ('11111111-1111-1111-1111-111111111111', 'Lisa Becker', 'lisa@example.com', true, true, 'Jan Becker', 2, 'vegetarian', 'Laktosefrei', 'Wir freuen uns riesig auf euren Tag.'),
  ('11111111-1111-1111-1111-111111111111', 'Moritz Klein', 'moritz@example.com', true, false, null, 1, 'fish', null, 'Ich uebernehme gern noch einen Fahrdienst spaeter am Abend.'),
  ('11111111-1111-1111-1111-111111111111', 'Sophie Wagner', 'sophie@example.com', false, false, null, 1, null, null, 'Leider bin ich an dem Wochenende schon verreist.');
