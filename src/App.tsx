import { useState, useMemo, useEffect } from 'react';
import { Check, X, ChevronRight, ChevronLeft, RotateCcw, BookOpen, Target, Award, Clock } from 'lucide-react';

// ============ 220+ MCQ BANK ============
const MCQS = [
  // ======== J&K STATIC GK (60) ========
  { id: 1, section: 'jk', q: "The Treaty of Amritsar (1846) was signed between Maharaja Gulab Singh and:", o: ["Ranjit Singh", "The British East India Company", "Mughal Empire", "Afghan rulers"], a: 1, exp: "Signed on 16 March 1846 after the First Anglo-Sikh War. Gulab Singh paid ₹75 lakh Nanakshahi to the British." },
  { id: 2, section: 'jk', q: "Who was the founder of the Dogra dynasty in J&K?", o: ["Ranbir Singh", "Hari Singh", "Gulab Singh", "Pratap Singh"], a: 2, exp: "Maharaja Gulab Singh founded the Dogra state on 16 March 1846 via the Treaty of Amritsar." },
  { id: 3, section: 'jk', q: "The largest freshwater lake in Asia located in J&K is:", o: ["Dal Lake", "Wular Lake", "Mansar Lake", "Pangong Tso"], a: 1, exp: "Wular Lake in Bandipora is the largest freshwater lake in Asia. It is a Ramsar site (1990)." },
  { id: 4, section: 'jk', q: "The Chenab River is formed by the confluence of:", o: ["Indus and Shyok", "Jhelum and Tawi", "Chandra and Bhaga", "Ravi and Beas"], a: 2, exp: "Chandra + Bhaga meet at Tandi in Himachal Pradesh to form the Chenab." },
  { id: 5, section: 'jk', q: "The Jhelum River originates from:", o: ["Kolahoi glacier", "Verinag spring", "Amarnath cave", "Sonmarg glacier"], a: 1, exp: "Jhelum rises at Verinag spring in Anantnag district." },
  { id: 6, section: 'jk', q: "Article 370 was abrogated on:", o: ["5 August 2019", "15 August 2019", "31 October 2019", "26 January 2020"], a: 0, exp: "Articles 370 and 35A were abrogated on 5 August 2019 via Presidential Order C.O. 272." },
  { id: 7, section: 'jk', q: "The J&K Reorganisation Act came into force on:", o: ["5 August 2019", "26 October 2019", "31 October 2019", "15 August 2019"], a: 2, exp: "The Act took effect on 31 October 2019 — National Unity Day / Sardar Patel's birth anniversary." },
  { id: 8, section: 'jk', q: "Maharaja Hari Singh signed the Instrument of Accession on:", o: ["15 August 1947", "26 October 1947", "27 October 1947", "22 October 1947"], a: 1, exp: "Signed on 26 October 1947; accepted by Lord Mountbatten on 27 October 1947." },
  { id: 9, section: 'jk', q: "How many districts does UT of J&K have?", o: ["18", "20", "22", "24"], a: 1, exp: "J&K UT has 20 districts: 10 in Kashmir division, 10 in Jammu division." },
  { id: 10, section: 'jk', q: "How many districts does UT of Ladakh have?", o: ["1", "2", "3", "4"], a: 1, exp: "Ladakh UT has 2 districts: Leh and Kargil." },
  { id: 11, section: 'jk', q: "The state animal of J&K is:", o: ["Snow Leopard", "Hangul (Kashmir stag)", "Markhor", "Ibex"], a: 1, exp: "Hangul (Kashmir stag) is the state animal; protected in Dachigam National Park." },
  { id: 12, section: 'jk', q: "The state tree of J&K is:", o: ["Deodar", "Chinar", "Walnut", "Pine"], a: 1, exp: "Chinar (Boueen in Kashmiri) is the state tree of J&K." },
  { id: 13, section: 'jk', q: "Who built the Shalimar Bagh in Srinagar (1619)?", o: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"], a: 1, exp: "Jahangir built Shalimar Bagh in 1619 for his wife Nur Jahan." },
  { id: 14, section: 'jk', q: "Nishat Bagh was built in 1633 by:", o: ["Jahangir", "Shah Jahan", "Asif Khan", "Dara Shikoh"], a: 2, exp: "Asif Khan (Nur Jahan's brother) built Nishat Bagh with 12 terraces representing zodiac signs." },
  { id: 15, section: 'jk', q: "Pari Mahal was built by:", o: ["Akbar", "Jahangir", "Dara Shikoh", "Aurangzeb"], a: 2, exp: "Pari Mahal ('Palace of Fairies') was built by Dara Shikoh around 1650." },
  { id: 16, section: 'jk', q: "The Martand Sun Temple was built by:", o: ["Avantivarman", "Lalitaditya Muktapida", "Zain-ul-Abidin", "Akbar"], a: 1, exp: "Built by Lalitaditya Muktapida of Karkota dynasty (c. 725–756 CE). Destroyed by Sikandar Butshikan." },
  { id: 17, section: 'jk', q: "Zain-ul-Abidin, known as 'Budshah', belonged to which dynasty?", o: ["Karkota", "Utpala", "Shah Miri", "Chak"], a: 2, exp: "Zain-ul-Abidin (1420–1470) of the Shah Miri dynasty introduced shawl weaving and papier-mâché to Kashmir." },
  { id: 18, section: 'jk', q: "Kashmir was annexed by Akbar in:", o: ["1526", "1556", "1586", "1605"], a: 2, exp: "Akbar annexed Kashmir in 1586 by defeating Yusuf Shah Chak." },
  { id: 19, section: 'jk', q: "Ranjit Singh conquered Kashmir in the Battle of Shopian in:", o: ["1809", "1819", "1829", "1846"], a: 1, exp: "Maharaja Ranjit Singh defeated the Afghans at Shopian in 1819, ending Durrani rule." },
  { id: 20, section: 'jk', q: "Raghunath Temple in Jammu was built by:", o: ["Gulab Singh and Ranbir Singh", "Pratap Singh", "Hari Singh", "Maharaja Ranjit Dev"], a: 0, exp: "Started by Gulab Singh in 1835 and completed by his son Ranbir Singh in 1860." },
  { id: 21, section: 'jk', q: "The highest motorable pass in the world is:", o: ["Khardung La", "Zoji La", "Banihal Pass", "Umling La"], a: 3, exp: "Umling La (5,883 m) in Ladakh is the world's highest motorable pass." },
  { id: 22, section: 'jk', q: "The Zoji La pass connects:", o: ["Kashmir and Jammu", "Kashmir and Ladakh", "Ladakh and Tibet", "Jammu and Himachal"], a: 1, exp: "Zoji La (3,528 m) is a high mountain pass connecting Kashmir Valley with Ladakh." },
  { id: 23, section: 'jk', q: "The Banihal Pass lies in which mountain range?", o: ["Greater Himalayas", "Pir Panjal", "Karakoram", "Zanskar"], a: 1, exp: "Banihal Pass (2,832 m) is in the Pir Panjal range; Jawahar Tunnel runs beneath it." },
  { id: 24, section: 'jk', q: "The Siachen Glacier is the:", o: ["Longest glacier in the world", "Longest non-polar glacier", "Highest peak in Asia", "Largest ice cap"], a: 1, exp: "Siachen (~76 km) is the world's longest non-polar glacier and highest battlefield." },
  { id: 25, section: 'jk', q: "Operation Meghdoot (1984) was launched to control:", o: ["Kargil", "Siachen Glacier", "LoC", "Turtuk sector"], a: 1, exp: "India launched Operation Meghdoot on 13 April 1984 to gain control of Siachen Glacier." },
  { id: 26, section: 'jk', q: "The largest national park in India is:", o: ["Dachigam", "Hemis", "Jim Corbett", "Kishtwar"], a: 1, exp: "Hemis National Park (~4,400 km²) in Ladakh is India's largest NP; highest snow leopard density." },
  { id: 27, section: 'jk', q: "Dachigam National Park is famous for:", o: ["Snow Leopard", "Hangul", "Markhor", "Ibex"], a: 1, exp: "Dachigam (Srinagar) is the last refuge of the Hangul (Kashmir stag)." },
  { id: 28, section: 'jk', q: "Pangong Tso lake is shared between:", o: ["India and Pakistan", "India and China", "India and Nepal", "India and Bhutan"], a: 1, exp: "Pangong Tso is ~60% in China; saline; ~134 km long." },
  { id: 29, section: 'jk', q: "The Mansar and Surinsar lakes are located in which division?", o: ["Kashmir", "Jammu", "Ladakh", "Pir Panjal"], a: 1, exp: "Mansar and Surinsar are twin Ramsar lakes in Jammu division." },
  { id: 30, section: 'jk', q: "The first LG of UT of J&K was:", o: ["Manoj Sinha", "G.C. Murmu", "Satya Pal Malik", "R.K. Mathur"], a: 1, exp: "G.C. Murmu was the first LG of J&K UT (31 Oct 2019 – 5 Aug 2020)." },
  { id: 31, section: 'jk', q: "Number of elected seats in J&K Legislative Assembly:", o: ["87", "90", "107", "114"], a: 1, exp: "90 elected seats (43 Jammu + 47 Kashmir) plus 24 reserved for PoK (vacant) and 5 LG-nominated." },
  { id: 32, section: 'jk', q: "The official languages of J&K (per 2020 Act) are:", o: ["Urdu and English", "Kashmiri, Urdu, English", "Kashmiri, Dogri, Urdu, Hindi, English", "Dogri, Urdu, Hindi"], a: 2, exp: "J&K Official Languages Act 2020 added Kashmiri, Dogri and Hindi to existing Urdu & English." },
  { id: 33, section: 'jk', q: "Pashmina wool comes from which goat breed?", o: ["Merino", "Changthangi", "Angora", "Cashmere"], a: 1, exp: "Changthangi goat of Changthang plateau in Ladakh produces the finest Pashmina wool." },
  { id: 34, section: 'jk', q: "Rouf is a folk dance of:", o: ["Jammu Dogras", "Kashmiri women", "Ladakhi men", "Gujjars"], a: 1, exp: "Rouf is performed by Kashmiri women, especially during Eid and spring." },
  { id: 35, section: 'jk', q: "Kud dance is associated with:", o: ["Kashmir", "Ladakh", "Jammu (Dogra region)", "Gujjar tribe"], a: 2, exp: "Kud is a ritual folk dance of the Dogra region of Jammu." },
  { id: 36, section: 'jk', q: "Bhand Pather is a traditional:", o: ["Dance form", "Folk theatre", "Musical instrument", "Painting style"], a: 1, exp: "Bhand Pather is a satirical folk-theatre tradition of Kashmir." },
  { id: 37, section: 'jk', q: "The Basohli painting school originated in:", o: ["Kashmir valley", "Jammu region", "Ladakh", "Doda"], a: 1, exp: "Basohli miniatures originated in Basohli (Kathua, Jammu) in the 17th century." },
  { id: 38, section: 'jk', q: "Charar-e-Sharief is the shrine of:", o: ["Sheikh Hamza Makhdoom", "Sheikh Noor-ud-din Wali", "Lal Ded", "Hazrat Bal"], a: 1, exp: "Charar-e-Sharief houses the shrine of Sheikh Noor-ud-din Wali (Nund Rishi)." },
  { id: 39, section: 'jk', q: "Hazratbal shrine holds:", o: ["Tooth of the Prophet", "Moi-e-Muqaddas (hair relic)", "Prophet's sandals", "A holy stone"], a: 1, exp: "Hazratbal on Dal Lake enshrines the Moi-e-Muqaddas — a hair relic of Prophet Muhammad." },
  { id: 40, section: 'jk', q: "Lalitaditya Muktapida belonged to which dynasty?", o: ["Utpala", "Karkota", "Shah Miri", "Lohara"], a: 1, exp: "Lalitaditya (c. 724–760 CE) was the greatest ruler of the Karkota dynasty." },
  { id: 41, section: 'jk', q: "Awantipora temples were built by:", o: ["Lalitaditya", "Avantivarman", "Jayapida", "Didda"], a: 1, exp: "Avantivarman of the Utpala dynasty (855–883 CE) built Awantipora temples." },
  { id: 42, section: 'jk', q: "Persian was replaced by Urdu as court language of J&K in 1889 by:", o: ["Gulab Singh", "Ranbir Singh", "Pratap Singh", "Hari Singh"], a: 2, exp: "Maharaja Pratap Singh replaced Persian with Urdu as the official court language in 1889." },
  { id: 43, section: 'jk', q: "Sheikh Mohammad Abdullah founded the National Conference in:", o: ["1932", "1938", "1939", "1947"], a: 2, exp: "Founded as Muslim Conference in 1932; renamed Jammu & Kashmir National Conference in 1939." },
  { id: 44, section: 'jk', q: "The 'Quit Kashmir' movement was launched by Sheikh Abdullah in:", o: ["1942", "1946", "1947", "1948"], a: 1, exp: "The Quit Kashmir movement was launched in 1946 against Maharaja Hari Singh." },
  { id: 45, section: 'jk', q: "The Hari Parbat Fort in Srinagar was built by:", o: ["Zain-ul-Abidin", "Akbar", "Jahangir", "Aurangzeb"], a: 1, exp: "Akbar built the outer wall of Hari Parbat Fort in the 1590s." },
  { id: 46, section: 'jk', q: "Verinag spring and pavilion were commissioned by:", o: ["Akbar", "Jahangir and Shah Jahan", "Aurangzeb", "Dara Shikoh"], a: 1, exp: "Jahangir commissioned the octagonal pool in 1620; Shah Jahan added pavilions." },
  { id: 47, section: 'jk', q: "The smallest national park in India (9 km²) is:", o: ["Dachigam", "Salim Ali", "Kishtwar", "Kazinag"], a: 1, exp: "Salim Ali National Park in Srinagar is India's smallest NP at about 9 km²." },
  { id: 48, section: 'jk', q: "The highest peak in J&K UT is:", o: ["Nun", "Kun", "Nanga Parbat", "Harmukh"], a: 2, exp: "Nanga Parbat (8,126 m) is the highest peak in J&K (currently in PoK)." },
  { id: 49, section: 'jk', q: "The Tawi river flows through which city?", o: ["Srinagar", "Jammu", "Leh", "Anantnag"], a: 1, exp: "Tawi is a tributary of the Chenab and flows through Jammu city." },
  { id: 50, section: 'jk', q: "The Amarnath cave shrine is located in which district?", o: ["Anantnag", "Kulgam", "Ganderbal", "Kishtwar"], a: 0, exp: "Amarnath cave (3,888 m) is located in Anantnag district." },
  { id: 51, section: 'jk', q: "Vaishno Devi shrine is in which district?", o: ["Udhampur", "Reasi", "Rajouri", "Kathua"], a: 1, exp: "Vaishno Devi (Trikuta hills) is located in Reasi district of Jammu." },
  { id: 52, section: 'jk', q: "The deepest lake in Kashmir is:", o: ["Dal", "Wular", "Manasbal", "Gangabal"], a: 2, exp: "Manasbal Lake in Ganderbal district is the deepest lake in Kashmir." },
  { id: 53, section: 'jk', q: "Tso Moriri and Tsokar lakes are found in:", o: ["Kashmir valley", "Ladakh (saline)", "Pir Panjal", "Jammu region"], a: 1, exp: "Both are saline Ramsar lakes in Ladakh; habitat of the black-necked crane." },
  { id: 54, section: 'jk', q: "The Kani shawl, a GI product, comes from which village?", o: ["Kanihama", "Pampore", "Gulmarg", "Anantnag"], a: 0, exp: "Kani shawls are hand-woven in Kanihama village of Budgam district." },
  { id: 55, section: 'jk', q: "The saffron of Kashmir primarily comes from:", o: ["Gulmarg", "Pahalgam", "Pampore", "Sonmarg"], a: 2, exp: "Pampore in Pulwama district is famous as the 'Saffron town' of India." },
  { id: 56, section: 'jk', q: "The first PM of J&K (1948–1953) was:", o: ["Sheikh Abdullah", "Bakshi Ghulam Mohammad", "G.M. Sadiq", "Mir Qasim"], a: 0, exp: "Sheikh Mohammad Abdullah was the first Prime Minister of J&K from 1948 to 1953." },
  { id: 57, section: 'jk', q: "Darbar Move (biannual capital shift) was ended in:", o: ["2019", "2020", "2021", "2022"], a: 2, exp: "Darbar Move tradition (since 1872) was ended in 2021 by the J&K administration." },
  { id: 58, section: 'jk', q: "The Jawahar Tunnel lies on which national highway?", o: ["NH-1A (old)/NH-44", "NH-1D", "NH-144", "NH-244"], a: 0, exp: "Jawahar Tunnel is on NH-44 (old NH-1A) connecting Jammu and Srinagar, below Banihal Pass." },
  { id: 59, section: 'jk', q: "The common High Court for J&K and Ladakh is headquartered at:", o: ["Only Srinagar", "Only Jammu", "Srinagar and Jammu (wings)", "Leh"], a: 2, exp: "The High Court of J&K and Ladakh functions with wings at both Srinagar and Jammu." },
  { id: 60, section: 'jk', q: "Papier-mâché and shawl weaving were introduced in Kashmir by:", o: ["Lalitaditya", "Zain-ul-Abidin (Budshah)", "Akbar", "Sheikh Noor-ud-din"], a: 1, exp: "Sultan Zain-ul-Abidin 'Budshah' (1420–1470) introduced papier-mâché and shawl weaving." },

  // ======== J&K CURRENT AFFAIRS (30) ========
  { id: 61, section: 'ca', q: "The first Chief Minister of UT of J&K is:", o: ["Mehbooba Mufti", "Omar Abdullah", "Ghulam Nabi Azad", "Farooq Abdullah"], a: 1, exp: "Omar Abdullah took oath as first CM of UT J&K on 16 October 2024 at SKICC, Srinagar." },
  { id: 62, section: 'ca', q: "The Deputy CM of J&K (2024) is:", o: ["Tariq Hameed Karra", "Sakina Ittoo", "Surinder Kumar Choudhary", "Javed Rana"], a: 2, exp: "Surinder Kumar Choudhary (MLA Nowshera) defeated BJP's Ravinder Raina and became Deputy CM." },
  { id: 63, section: 'ca', q: "The Speaker of J&K Legislative Assembly (2024) is:", o: ["Mubarak Gul", "Abdul Rahim Rather", "Nirmal Singh", "Kavinder Gupta"], a: 1, exp: "Seven-time MLA Abdul Rahim Rather was unanimously elected Speaker of J&K Assembly." },
  { id: 64, section: 'ca', q: "Current LG of J&K (April 2026) is:", o: ["G.C. Murmu", "Satya Pal Malik", "Manoj Sinha", "R.K. Mathur"], a: 2, exp: "Manoj Sinha has been LG of J&K since 7 August 2020; continues at the President's pleasure." },
  { id: 65, section: 'ca', q: "Current LG of Ladakh (2026) is:", o: ["R.K. Mathur", "B.D. Mishra", "Kavinder Gupta", "Manoj Sinha"], a: 2, exp: "Kavinder Gupta was sworn in as the 3rd LG of Ladakh on 18 July 2025." },
  { id: 66, section: 'ca', q: "The DGP of J&K (since October 2024) is:", o: ["R.R. Swain", "Nalin Prabhat", "Dilbag Singh", "Atul Goel"], a: 1, exp: "Nalin Prabhat took charge as the 18th DGP of J&K on 1 October 2024." },
  { id: 67, section: 'ca', q: "The Chief Secretary of J&K is:", o: ["Arun Kumar Mehta", "B.V.R. Subrahmanyam", "Atal Dulloo", "Alok Kumar"], a: 2, exp: "Atal Dulloo (IAS) is the Chief Secretary of J&K UT." },
  { id: 68, section: 'ca', q: "The world's highest railway arch bridge, inaugurated in 2025, is:", o: ["Pamban Bridge", "Anji Khad Bridge", "Chenab Rail Bridge", "Bogibeel Bridge"], a: 2, exp: "Chenab Rail Bridge — 359 m above river, 1,315 m long — is the world's highest railway arch bridge." },
  { id: 69, section: 'ca', q: "PM Modi inaugurated the Chenab Rail Bridge on:", o: ["26 Jan 2025", "13 Jan 2025", "6 June 2025", "15 Aug 2025"], a: 2, exp: "PM Modi dedicated the Chenab & Anji bridges and flagged off Vande Bharat on 6 June 2025." },
  { id: 70, section: 'ca', q: "India's first cable-stayed railway bridge is:", o: ["Chenab Bridge", "Anji Khad Bridge", "Bogibeel Bridge", "Pamban"], a: 1, exp: "Anji Khad Bridge (473 m, 193 m pylon) is India's first cable-stayed railway bridge." },
  { id: 71, section: 'ca', q: "The Z-Morh (Sonamarg) Tunnel was inaugurated on:", o: ["13 January 2025", "6 June 2025", "26 January 2025", "31 October 2024"], a: 0, exp: "PM Modi inaugurated the 6.5-km Z-Morh Tunnel on NH-1 on 13 January 2025." },
  { id: 72, section: 'ca', q: "The Pahalgam terror attack that killed 26 occurred on:", o: ["22 April 2025", "7 May 2025", "14 February 2019", "10 May 2025"], a: 0, exp: "Attack on 22 April 2025 at Baisaran meadow, Pahalgam, by The Resistance Front (LeT proxy)." },
  { id: 73, section: 'ca', q: "Operation Sindoor was launched by India on:", o: ["22 April 2025", "7 May 2025", "10 May 2025", "26 October 2024"], a: 1, exp: "Operation Sindoor struck 9 terror sites in Pakistan/PoK on 7 May 2025 at 1:05 am IST." },
  { id: 74, section: 'ca', q: "India suspended the Indus Waters Treaty in response to Pahalgam attack on:", o: ["22 April 2025", "23 April 2025", "7 May 2025", "10 May 2025"], a: 1, exp: "India suspended the 1960 Indus Waters Treaty on 23 April 2025 — a historic first." },
  { id: 75, section: 'ca', q: "The Katra–Srinagar Vande Bharat Express was flagged off on:", o: ["13 January 2025", "6 June 2025", "26 January 2025", "15 August 2025"], a: 1, exp: "PM Modi flagged off the 189-km Katra–Srinagar Vande Bharat on 6 June 2025." },
  { id: 76, section: 'ca', q: "J&K Budget 2025-26 was presented by Omar Abdullah on:", o: ["1 Feb 2025", "7 March 2025", "31 March 2025", "15 April 2025"], a: 1, exp: "First elected-government budget in 7 years, presented on 7 March 2025; size ~₹1.12 lakh crore." },
  { id: 77, section: 'ca', q: "'Mission YUVA' launched in J&K aims to create how many enterprises?", o: ["50,000", "1 lakh", "1.37 lakh", "2 lakh"], a: 2, exp: "Mission YUVA targets 1.37 lakh enterprises and 4.25 lakh jobs in J&K." },
  { id: 78, section: 'ca', q: "The J&K Reorganisation (Amendment) Act reserves how many seats for nominees?", o: ["3 (women)", "5 (including women & Kashmiri migrants)", "7", "9"], a: 1, exp: "5 members can be nominated by the LG (including 2 women, 2 Kashmiri migrants, 1 PoK displaced)." },
  { id: 79, section: 'ca', q: "In the 2024 J&K Assembly election, the largest party was:", o: ["BJP", "JKNC", "Congress", "PDP"], a: 1, exp: "JKNC won 42 seats; BJP 29; Congress 6; PDP 3. NC-Congress formed government." },
  { id: 80, section: 'ca', q: "The 2024 J&K Assembly election was conducted in how many phases?", o: ["One", "Two", "Three", "Four"], a: 2, exp: "Three phases: 18 September, 25 September, and 1 October 2024. Results: 8 October 2024." },
  { id: 81, section: 'ca', q: "Tourist footfall in J&K in 2025 was approximately:", o: ["1.5 crore", "1.62 crore", "1.77 crore", "2.36 crore"], a: 2, exp: "Around 1.77 crore tourists visited J&K in 2025 (2024 was a record 2.36 crore)." },
  { id: 82, section: 'ca', q: "The President of India (2026) is:", o: ["Ram Nath Kovind", "Droupadi Murmu", "Pratibha Patil", "Venkaiah Naidu"], a: 1, exp: "Droupadi Murmu is the 15th and current President of India (since 25 July 2022)." },
  { id: 83, section: 'ca', q: "The Vice President of India (April 2026) is:", o: ["Jagdeep Dhankhar", "Venkaiah Naidu", "CP Radhakrishnan", "Hamid Ansari"], a: 2, exp: "CP Radhakrishnan became the 15th VP on 9 September 2025 after Dhankhar resigned on 21 July 2025." },
  { id: 84, section: 'ca', q: "The 53rd Chief Justice of India (sworn 24 Nov 2025) is:", o: ["D.Y. Chandrachud", "B.R. Gavai", "Surya Kant", "Sanjiv Khanna"], a: 2, exp: "Justice Surya Kant is the 53rd CJI, succeeding BR Gavai (the 52nd, first Buddhist CJI)." },
  { id: 85, section: 'ca', q: "The current Chief Election Commissioner is:", o: ["Sushil Chandra", "Rajiv Kumar", "Gyanesh Kumar", "Anup Chandra Pandey"], a: 2, exp: "Gyanesh Kumar is the current Chief Election Commissioner of India." },
  { id: 86, section: 'ca', q: "ISRO's SpaDeX first docking success was achieved on:", o: ["30 Dec 2024", "16 Jan 2025", "13 March 2025", "30 July 2025"], a: 1, exp: "India became the 4th country (after USA, Russia, China) to achieve space docking on 16 Jan 2025." },
  { id: 87, section: 'ca', q: "The NISAR satellite (NASA–ISRO) was launched on:", o: ["16 Jan 2025", "30 July 2025", "23 Aug 2025", "15 Aug 2025"], a: 1, exp: "NISAR, a dual-band L+S SAR satellite, was launched on 30 July 2025 via GSLV-F16." },
  { id: 88, section: 'ca', q: "Shubhanshu Shukla became the second Indian in space via:", o: ["Chandrayaan-4", "Gaganyaan", "Axiom-4 mission to ISS", "SpaDeX"], a: 2, exp: "Shukla flew aboard Axiom-4 to ISS (25 June – 15 July 2025) — second Indian after Rakesh Sharma." },
  { id: 89, section: 'ca', q: "India's National Space Day is celebrated on:", o: ["15 August", "23 August", "2 October", "28 February"], a: 1, exp: "23 August — marking Chandrayaan-3's landing on the Moon in 2023." },
  { id: 90, section: 'ca', q: "PARAM Rudra supercomputers (3 systems) were inaugurated on 27 Sept 2024 at:", o: ["Pune, Delhi, Kolkata", "Bengaluru, Pune, Hyderabad", "Delhi, Mumbai, Chennai", "Only Pune"], a: 0, exp: "Three PARAM Rudra systems were dedicated under the National Supercomputing Mission at Pune, Delhi & Kolkata." },

  // ======== NATIONAL/INTERNATIONAL CA & AWARDS (25) ========
  { id: 91, section: 'ca', q: "Union Budget 2025-26 made income tax-free up to:", o: ["₹5 lakh", "₹7 lakh", "₹10 lakh", "₹12 lakh"], a: 3, exp: "Budget 2025-26 made income up to ₹12 lakh (₹12.75 lakh for salaried) tax-free under the new regime." },
  { id: 92, section: 'ca', q: "RBI Governor (since December 2024) is:", o: ["Shaktikanta Das", "Sanjay Malhotra", "Urjit Patel", "Michael Patra"], a: 1, exp: "Sanjay Malhotra took charge as the 26th RBI Governor in December 2024." },
  { id: 93, section: 'ca', q: "ISRO Chairman (since January 2025) is:", o: ["S. Somanath", "V. Narayanan", "K. Sivan", "K. Radhakrishnan"], a: 1, exp: "V. Narayanan took over as ISRO Chairman on 14 January 2025." },
  { id: 94, section: 'ca', q: "Nobel Peace Prize 2025 was awarded to:", o: ["Nihon Hidankyo", "Maria Corina Machado", "Narges Mohammadi", "Ales Bialiatski"], a: 1, exp: "Venezuelan democracy activist María Corina Machado won the 2025 Nobel Peace Prize." },
  { id: 95, section: 'ca', q: "Nobel Peace Prize 2024 was awarded to:", o: ["ICAN", "Narges Mohammadi", "Nihon Hidankyo", "Maria Ressa"], a: 2, exp: "Nihon Hidankyo — the Japanese atomic-bomb survivors' organization — won the 2024 Nobel Peace Prize." },
  { id: 96, section: 'ca', q: "ICC Champions Trophy 2025 was won by:", o: ["Australia", "New Zealand", "India", "England"], a: 2, exp: "India beat New Zealand by 4 wickets in the final at Dubai on 9 March 2025 — third CT title." },
  { id: 97, section: 'ca', q: "IPL 2025 was won by:", o: ["Chennai Super Kings", "Kolkata Knight Riders", "Royal Challengers Bengaluru", "Mumbai Indians"], a: 2, exp: "RCB won their first-ever IPL title, beating Punjab Kings by 6 runs at Ahmedabad." },
  { id: 98, section: 'ca', q: "D Gukesh became the youngest World Chess Champion at age:", o: ["17", "18", "19", "20"], a: 1, exp: "D Gukesh (18) beat Ding Liren 7.5–6.5 in Singapore on 12 December 2024." },
  { id: 99, section: 'ca', q: "India's total medals at Paris Olympics 2024:", o: ["4", "5", "6", "7"], a: 2, exp: "India won 6 medals (1 silver + 5 bronze) at Paris 2024." },
  { id: 100, section: 'ca', q: "Neeraj Chopra won which medal in Paris 2024 javelin?", o: ["Gold", "Silver", "Bronze", "No medal"], a: 1, exp: "Neeraj won silver (89.45 m); gold went to Pakistan's Arshad Nadeem (92.97 m)." },
  { id: 101, section: 'ca', q: "Manu Bhaker won how many medals at Paris 2024?", o: ["1", "2", "3", "0"], a: 1, exp: "Two bronze medals — first Indian post-independence to win two medals in one Olympics." },
  { id: 102, section: 'ca', q: "India's medal count at Paris Paralympics 2024 was:", o: ["19", "25", "29", "32"], a: 2, exp: "India's best-ever 29 medals (7 Gold, 9 Silver, 13 Bronze) at Paris Paralympics 2024." },
  { id: 103, section: 'ca', q: "ICC Women's ODI World Cup 2025 was won by:", o: ["Australia", "South Africa", "India", "England"], a: 2, exp: "India won its maiden Women's ODI World Cup on 2 Nov 2025 beating South Africa." },
  { id: 104, section: 'ca', q: "The 59th Jnanpith Award (2024) went to:", o: ["Damodar Mauzo", "Gulzar", "Vinod Kumar Shukla", "Rambahadur Rai"], a: 2, exp: "Hindi author Vinod Kumar Shukla — first writer from Chhattisgarh to win the Jnanpith." },
  { id: 105, section: 'ca', q: "Bharat Ratna 2024 was NOT awarded to:", o: ["L.K. Advani", "MS Swaminathan", "Karpoori Thakur", "Manmohan Singh"], a: 3, exp: "Bharat Ratna 2024: LK Advani, Karpoori Thakur, Chaudhary Charan Singh, PV Narasimha Rao, MS Swaminathan." },
  { id: 106, section: 'ca', q: "Oscar Best Picture 2026 (98th Academy Awards) went to:", o: ["Anora", "Oppenheimer", "One Battle After Another", "Emilia Pérez"], a: 2, exp: "'One Battle After Another' (dir. Paul Thomas Anderson) won Best Picture with 6 Oscars." },
  { id: 107, section: 'ca', q: "Padma Vibhushan 2026 included which actor (posthumous)?", o: ["Shah Rukh Khan", "Dharmendra", "Amitabh Bachchan", "Mammootty"], a: 1, exp: "Dharmendra received Padma Vibhushan 2026 posthumously." },
  { id: 108, section: 'ca', q: "US President (2026) is:", o: ["Joe Biden", "Kamala Harris", "Donald Trump", "Barack Obama"], a: 2, exp: "Donald Trump is the 47th US President (inaugurated 20 January 2025); VP JD Vance." },
  { id: 109, section: 'ca', q: "G20 Summit 2025 was hosted by:", o: ["India", "Brazil", "South Africa", "USA"], a: 2, exp: "2025 G20 was held in Johannesburg, South Africa (22–23 Nov 2025) — first in Africa." },
  { id: 110, section: 'ca', q: "Pope Leo XIV became pope on:", o: ["21 April 2025", "8 May 2025", "15 March 2025", "24 June 2025"], a: 1, exp: "Pope Leo XIV (first American Pope) elected on 8 May 2025 after Pope Francis died 21 April 2025." },
  { id: 111, section: 'ca', q: "Japan's first woman Prime Minister is:", o: ["Yuriko Koike", "Sanae Takaichi", "Yoko Kamikawa", "Fumio Kishida"], a: 1, exp: "Sanae Takaichi became Japan's first woman PM in October 2025." },
  { id: 112, section: 'ca', q: "First Indian to win consecutive Paralympic javelin golds:", o: ["Devendra Jhajharia", "Sumit Antil", "Navdeep Singh", "Rinku Hooda"], a: 1, exp: "Sumit Antil won Paralympic javelin gold at Tokyo 2020 and Paris 2024 with a world record." },
  { id: 113, section: 'ca', q: "T20 World Cup 2024 was won by:", o: ["Australia", "India", "South Africa", "England"], a: 1, exp: "India beat South Africa in the final at Barbados — second T20 WC title." },
  { id: 114, section: 'ca', q: "Asian Games 2023 (Hangzhou) — India's medal tally:", o: ["71", "107", "121", "95"], a: 1, exp: "India won 107 medals (28G/38S/41B) — first time above 100." },
  { id: 115, section: 'ca', q: "Fiscal deficit target in Union Budget 2026-27:", o: ["4.4%", "4.5%", "4.3%", "3.8%"], a: 2, exp: "FY27 fiscal deficit target 4.3% of GDP; total expenditure ₹53.5 lakh crore." },

  // ======== GENERAL ENGLISH (40) ========
  { id: 116, section: 'eng', q: "Synonym of 'UBIQUITOUS':", o: ["Rare", "Omnipresent", "Hidden", "Unique"], a: 1, exp: "Ubiquitous means present everywhere = omnipresent." },
  { id: 117, section: 'eng', q: "Antonym of 'BENEVOLENT':", o: ["Kind", "Generous", "Malevolent", "Friendly"], a: 2, exp: "Benevolent means kind; opposite is malevolent (wishing evil)." },
  { id: 118, section: 'eng', q: "Synonym of 'CANDID':", o: ["Dishonest", "Frank", "Cunning", "Silent"], a: 1, exp: "Candid means openly honest / frank." },
  { id: 119, section: 'eng', q: "Antonym of 'DILIGENT':", o: ["Careful", "Lazy/Indolent", "Attentive", "Sincere"], a: 1, exp: "Diligent means hard-working; opposite is indolent/lazy." },
  { id: 120, section: 'eng', q: "Synonym of 'EPHEMERAL':", o: ["Permanent", "Short-lived", "Eternal", "Heavenly"], a: 1, exp: "Ephemeral means lasting a short time / transient." },
  { id: 121, section: 'eng', q: "Antonym of 'LACONIC':", o: ["Brief", "Verbose", "Calm", "Witty"], a: 1, exp: "Laconic = using few words; opposite is verbose (wordy)." },
  { id: 122, section: 'eng', q: "One who collects coins is called:", o: ["Philatelist", "Numismatist", "Bibliophile", "Cartographer"], a: 1, exp: "Numismatist = coin collector. Philatelist = stamps. Bibliophile = books." },
  { id: 123, section: 'eng', q: "One who collects stamps is called:", o: ["Numismatist", "Philatelist", "Philologist", "Lexicographer"], a: 1, exp: "Philatelist = one who collects postage stamps." },
  { id: 124, section: 'eng', q: "A person who walks in sleep is called:", o: ["Somniloquist", "Somnambulist", "Insomniac", "Sleepwalker"], a: 1, exp: "Somnambulist = sleepwalker. Somniloquist = one who talks in sleep." },
  { id: 125, section: 'eng', q: "A person who hates mankind is called:", o: ["Misogynist", "Misanthrope", "Misogamist", "Philanderer"], a: 1, exp: "Misanthrope = hater of mankind. Misogynist = hates women. Misogamist = hates marriage." },
  { id: 126, section: 'eng', q: "A government by a few is called:", o: ["Democracy", "Oligarchy", "Theocracy", "Autocracy"], a: 1, exp: "Oligarchy = rule by a few. Autocracy = rule by one. Theocracy = rule by priests/religion." },
  { id: 127, section: 'eng', q: "One who abstains from alcoholic drinks is called:", o: ["Ascetic", "Teetotaller", "Atheist", "Celibate"], a: 1, exp: "Teetotaller = a person who abstains completely from alcohol." },
  { id: 128, section: 'eng', q: "A person who can use both hands equally well:", o: ["Ambivalent", "Ambidextrous", "Ambiguous", "Amphibious"], a: 1, exp: "Ambidextrous = able to use both hands with equal skill." },
  { id: 129, section: 'eng', q: "A remedy for all diseases:", o: ["Antidote", "Panacea", "Vaccine", "Placebo"], a: 1, exp: "Panacea = a solution or remedy for all ills." },
  { id: 130, section: 'eng', q: "A speech delivered without preparation:", o: ["Eloquent", "Extempore", "Elaborate", "Evocative"], a: 1, exp: "Extempore = done without preparation (impromptu)." },
  { id: 131, section: 'eng', q: "'Bury the hatchet' means:", o: ["To fight", "To make peace", "To hide weapons", "To dig"], a: 1, exp: "Bury the hatchet = end a quarrel / make peace." },
  { id: 132, section: 'eng', q: "'A piece of cake' means:", o: ["A dessert", "Something very easy", "A gift", "A reward"], a: 1, exp: "A piece of cake = something very easy to do." },
  { id: 133, section: 'eng', q: "'Once in a blue moon' means:", o: ["Very often", "Very rarely", "Never", "On a Monday"], a: 1, exp: "Once in a blue moon = very rarely." },
  { id: 134, section: 'eng', q: "'To cost an arm and a leg' means:", o: ["To be cheap", "To be very expensive", "To be painful", "To be dangerous"], a: 1, exp: "Cost an arm and a leg = very expensive." },
  { id: 135, section: 'eng', q: "'Spill the beans' means:", o: ["To waste food", "To reveal a secret", "To be clumsy", "To cook"], a: 1, exp: "Spill the beans = reveal a secret unintentionally." },
  { id: 136, section: 'eng', q: "'Born with a silver spoon' means:", o: ["Born rich", "Born poor", "Born ill", "Born abroad"], a: 0, exp: "Born with a silver spoon in one's mouth = born into wealth." },
  { id: 137, section: 'eng', q: "'At the drop of a hat' means:", o: ["Instantly/without delay", "Very slowly", "Unwillingly", "After thinking"], a: 0, exp: "At the drop of a hat = without hesitation / immediately." },
  { id: 138, section: 'eng', q: "Choose the correct: 'She is senior ___ me.'", o: ["than", "to", "from", "of"], a: 1, exp: "Senior / junior / superior / inferior / prior take 'to', not 'than'." },
  { id: 139, section: 'eng', q: "Choose the correct article: 'He is ___ honest man.'", o: ["a", "an", "the", "no article"], a: 1, exp: "'Honest' begins with a silent 'h' (vowel sound), so 'an' is correct." },
  { id: 140, section: 'eng', q: "Choose the correct article: 'He is ___ university student.'", o: ["a", "an", "the", "no article"], a: 0, exp: "'University' starts with a 'y' consonant sound, so 'a' is correct." },
  { id: 141, section: 'eng', q: "Choose the correct article: 'She completed ___ MBA.'", o: ["a", "an", "the", "no article"], a: 1, exp: "MBA starts with vowel sound 'em', so 'an MBA' is correct." },
  { id: 142, section: 'eng', q: "Fill: 'The news ___ true.'", o: ["are", "is", "were", "have been"], a: 1, exp: "News is a singular noun — takes singular verb 'is'." },
  { id: 143, section: 'eng', q: "Fill: 'Neither Ram nor his friends ___ coming.'", o: ["is", "are", "was", "has been"], a: 1, exp: "With neither/nor, the verb agrees with the nearest subject (friends = plural)." },
  { id: 144, section: 'eng', q: "Correct form: 'Mathematics ___ my favourite subject.'", o: ["are", "is", "were", "have"], a: 1, exp: "Mathematics, though ending in -s, takes a singular verb." },
  { id: 145, section: 'eng', q: "Passive voice of: 'They are building a house.'", o: ["A house is being built by them.", "A house was built by them.", "A house has been built.", "A house is built."], a: 0, exp: "Present continuous passive: is/are + being + V3." },
  { id: 146, section: 'eng', q: "Indirect speech: He said, 'I am tired.'", o: ["He said that I was tired.", "He said that he is tired.", "He said that he was tired.", "He told I was tired."], a: 2, exp: "Reporting verb 'said' → past; pronoun I→he; is→was." },
  { id: 147, section: 'eng', q: "Choose the correctly spelled word:", o: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], a: 2, exp: "Correct spelling: Accommodate (double c, double m)." },
  { id: 148, section: 'eng', q: "Choose the correctly spelled word:", o: ["Separate", "Seperate", "Seaparate", "Seperete"], a: 0, exp: "Separate is the correct spelling." },
  { id: 149, section: 'eng', q: "Synonym of 'METICULOUS':", o: ["Careless", "Careful", "Messy", "Rapid"], a: 1, exp: "Meticulous = very careful and precise about details." },
  { id: 150, section: 'eng', q: "Antonym of 'GREGARIOUS':", o: ["Sociable", "Reclusive", "Friendly", "Talkative"], a: 1, exp: "Gregarious = sociable; opposite is reclusive (prefers solitude)." },
  { id: 151, section: 'eng', q: "Synonym of 'TENACIOUS':", o: ["Weak", "Persistent", "Lazy", "Generous"], a: 1, exp: "Tenacious = holding firmly / persistent." },
  { id: 152, section: 'eng', q: "Difference - 'Stationary' vs 'Stationery':", o: ["Both same", "Stationary = not moving; Stationery = paper goods", "Stationery = still; Stationary = pens", "No difference"], a: 1, exp: "Stationary (adj) = not moving. Stationery (noun) = writing materials." },
  { id: 153, section: 'eng', q: "Choose correct: 'He has been working ___ morning.'", o: ["for", "since", "from", "at"], a: 1, exp: "'Since' is used with point of time (morning). 'For' is used with duration (3 hours)." },
  { id: 154, section: 'eng', q: "'Beat around the bush' means:", o: ["To hit something", "To avoid the main topic", "To work in a garden", "To hunt"], a: 1, exp: "Beat around the bush = speak indirectly / avoid the main point." },
  { id: 155, section: 'eng', q: "One-word: A place where government records are kept:", o: ["Aquarium", "Arsenal", "Archives", "Abattoir"], a: 2, exp: "Archives = place where public records/historical documents are preserved." },

  // ======== COMPUTER KNOWLEDGE (40) ========
  { id: 156, section: 'cs', q: "Who is known as the 'Father of Computer'?", o: ["Alan Turing", "Charles Babbage", "John von Neumann", "Bill Gates"], a: 1, exp: "Charles Babbage is called the Father of Computer for designing the Analytical Engine (1837)." },
  { id: 157, section: 'cs', q: "Who is considered the world's first computer programmer?", o: ["Ada Lovelace", "Grace Hopper", "Alan Turing", "John McCarthy"], a: 0, exp: "Ada Lovelace wrote the first algorithm for Babbage's Analytical Engine." },
  { id: 158, section: 'cs', q: "Father of Artificial Intelligence:", o: ["Alan Turing", "John McCarthy", "Geoffrey Hinton", "Marvin Minsky"], a: 1, exp: "John McCarthy coined the term 'Artificial Intelligence' in 1956." },
  { id: 159, section: 'cs', q: "Who invented the World Wide Web?", o: ["Vint Cerf", "Tim Berners-Lee", "Bill Gates", "Steve Jobs"], a: 1, exp: "Sir Tim Berners-Lee invented the WWW in 1989 at CERN." },
  { id: 160, section: 'cs', q: "First generation computers used:", o: ["Transistors", "Vacuum tubes", "Integrated Circuits", "Microprocessors"], a: 1, exp: "1st generation (1940–56) used vacuum tubes (e.g., ENIAC, UNIVAC-I)." },
  { id: 161, section: 'cs', q: "Second generation computers used:", o: ["Vacuum tubes", "Transistors", "ICs", "VLSI"], a: 1, exp: "2nd generation (1956–63) used transistors (invented 1947 by Bardeen, Brattain, Shockley)." },
  { id: 162, section: 'cs', q: "Fourth generation computers are based on:", o: ["Transistors", "ICs", "Microprocessors/VLSI", "AI"], a: 2, exp: "4th generation (1971–present) uses microprocessors and VLSI technology." },
  { id: 163, section: 'cs', q: "ENIAC, the first electronic computer, had how many vacuum tubes?", o: ["5,000", "10,000", "18,000", "25,000"], a: 2, exp: "ENIAC (1946) built by Eckert & Mauchly had about 18,000 vacuum tubes." },
  { id: 164, section: 'cs', q: "Full form of RAM:", o: ["Read Access Memory", "Random Access Memory", "Rapid Access Memory", "Read-only Access Memory"], a: 1, exp: "RAM = Random Access Memory (volatile main memory)." },
  { id: 165, section: 'cs', q: "Full form of ROM:", o: ["Read Only Memory", "Random Only Memory", "Read Open Memory", "Rapid Output Memory"], a: 0, exp: "ROM = Read Only Memory (non-volatile)." },
  { id: 166, section: 'cs', q: "1 Byte = ? bits", o: ["4", "8", "16", "32"], a: 1, exp: "1 Byte = 8 bits. 1 KB = 1024 Bytes." },
  { id: 167, section: 'cs', q: "1 GB = ? MB", o: ["1000", "1024", "500", "2048"], a: 1, exp: "1 GB = 1024 MB. 1 TB = 1024 GB." },
  { id: 168, section: 'cs', q: "Full form of CPU:", o: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Core Processing Unit"], a: 0, exp: "CPU = Central Processing Unit. It includes ALU, Control Unit, and Registers." },
  { id: 169, section: 'cs', q: "Full form of URL:", o: ["Uniform Resource Locator", "Universal Resource Locator", "Unified Resource Link", "Uniform Retrieval Link"], a: 0, exp: "URL = Uniform Resource Locator." },
  { id: 170, section: 'cs', q: "Full form of HTTP:", o: ["HyperText Transfer Protocol", "HyperText Transmission Program", "High Text Transfer Protocol", "Hybrid Transfer Protocol"], a: 0, exp: "HTTP = HyperText Transfer Protocol. HTTPS = Secure version (uses SSL/TLS)." },
  { id: 171, section: 'cs', q: "The default file extension for MS Word 2007+ is:", o: [".doc", ".docx", ".txt", ".wps"], a: 1, exp: "Word 2007+ uses .docx (XML-based Open Office format)." },
  { id: 172, section: 'cs', q: "File extension for MS Excel 2007+:", o: [".xls", ".xlsx", ".xml", ".xlc"], a: 1, exp: "Excel 2007+ uses .xlsx; older versions used .xls." },
  { id: 173, section: 'cs', q: "MS Excel 2007+ has how many rows per worksheet?", o: ["65,536", "1,048,576", "16,384", "10,00,000"], a: 1, exp: "Excel 2007+ has 1,048,576 rows and 16,384 columns (last col XFD)." },
  { id: 174, section: 'cs', q: "Shortcut to start PowerPoint slideshow from the beginning:", o: ["F1", "F5", "F8", "F11"], a: 1, exp: "F5 starts slideshow from beginning; Shift+F5 starts from current slide." },
  { id: 175, section: 'cs', q: "Ctrl + C is used to:", o: ["Cut", "Copy", "Paste", "Close"], a: 1, exp: "Ctrl+C = Copy. Ctrl+X = Cut. Ctrl+V = Paste. Ctrl+Z = Undo." },
  { id: 176, section: 'cs', q: "The brain of the computer is:", o: ["Hard disk", "RAM", "CPU", "Monitor"], a: 2, exp: "CPU is called the brain of the computer; it performs processing and control." },
  { id: 177, section: 'cs', q: "Which of these is a volatile memory?", o: ["ROM", "RAM", "Hard disk", "CD-ROM"], a: 1, exp: "RAM is volatile — data is lost when power is off. ROM is non-volatile." },
  { id: 178, section: 'cs', q: "DRAM stands for:", o: ["Dynamic RAM", "Digital RAM", "Direct RAM", "Double RAM"], a: 0, exp: "DRAM = Dynamic RAM (uses capacitors; main memory). SRAM = Static RAM (flip-flops; cache)." },
  { id: 179, section: 'cs', q: "Which is an impact printer?", o: ["Laser printer", "Inkjet printer", "Dot-matrix printer", "Thermal printer"], a: 2, exp: "Dot-matrix is an impact printer; laser/inkjet/thermal are non-impact." },
  { id: 180, section: 'cs', q: "MICR is used mainly in:", o: ["Schools", "Banks (cheque processing)", "Hospitals", "Libraries"], a: 1, exp: "MICR (Magnetic Ink Character Recognition) is used on bank cheques." },
  { id: 181, section: 'cs', q: "OMR is used for:", o: ["Reading printed characters", "Reading filled marks/bubbles", "Magnetic ink", "Biometric"], a: 1, exp: "OMR (Optical Mark Reader) reads filled marks — used in OMR exam sheets." },
  { id: 182, section: 'cs', q: "Full form of HTML:", o: ["HyperText Markup Language", "HighText Machine Language", "HyperText Making Language", "Hybrid Text Markup Language"], a: 0, exp: "HTML = HyperText Markup Language." },
  { id: 183, section: 'cs', q: "HTTPS uses port number:", o: ["21", "80", "443", "8080"], a: 2, exp: "HTTPS uses port 443. HTTP uses 80. FTP uses 21." },
  { id: 184, section: 'cs', q: "SMTP is used for:", o: ["Receiving email", "Sending email", "File transfer", "Web browsing"], a: 1, exp: "SMTP (Simple Mail Transfer Protocol) sends email. POP3/IMAP receive email." },
  { id: 185, section: 'cs', q: "Internet in India was launched publicly by VSNL on:", o: ["15 Aug 1991", "15 Aug 1995", "1 Jan 2000", "15 Aug 1947"], a: 1, exp: "VSNL launched public internet in India on 15 August 1995." },
  { id: 186, section: 'cs', q: "Which is the most common network topology?", o: ["Bus", "Ring", "Star", "Mesh"], a: 2, exp: "Star topology (central hub/switch) is the most common in modern LANs." },
  { id: 187, section: 'cs', q: "LAN stands for:", o: ["Large Area Network", "Local Area Network", "Local Access Network", "Line Area Network"], a: 1, exp: "LAN = Local Area Network. WAN = Wide Area Network. MAN = Metropolitan Area Network." },
  { id: 188, section: 'cs', q: "IPv4 address is how many bits long?", o: ["16", "32", "64", "128"], a: 1, exp: "IPv4 is 32 bits (~4.3 billion addresses). IPv6 is 128 bits." },
  { id: 189, section: 'cs', q: "A program that replicates itself through files is a:", o: ["Trojan", "Virus", "Worm", "Spyware"], a: 1, exp: "Virus replicates within files. Worm is standalone and replicates over networks." },
  { id: 190, section: 'cs', q: "VIRUS stands for:", o: ["Very Important Routine Under Search", "Vital Information Resources Under Seize", "Virtual Infected Resource Utility System", "None"], a: 1, exp: "VIRUS = Vital Information Resources Under Seize." },
  { id: 191, section: 'cs', q: "India's first supercomputer was:", o: ["CRAY-1", "PARAM 8000", "EKA", "Aaditya"], a: 1, exp: "PARAM 8000 was India's first supercomputer, launched in 1991 by C-DAC." },
  { id: 192, section: 'cs', q: "Father of Indian Supercomputing:", o: ["Vijay Bhatkar", "Narasimha Rao", "APJ Abdul Kalam", "Raj Reddy"], a: 0, exp: "Dr. Vijay P. Bhatkar led the PARAM series and is called the 'Father of Indian Supercomputing'." },
  { id: 193, section: 'cs', q: "Binary number 1101 in decimal is:", o: ["11", "12", "13", "14"], a: 2, exp: "1101 = 8+4+0+1 = 13 in decimal." },
  { id: 194, section: 'cs', q: "A compiler:", o: ["Translates line by line", "Translates whole program at once", "Executes without translation", "Is a hardware"], a: 1, exp: "Compiler translates the whole program into machine code at once. Interpreter translates line by line." },
  { id: 195, section: 'cs', q: "BCC in email means:", o: ["Blind Carbon Copy", "Basic Carbon Copy", "Back Copy Code", "Blind Code Copy"], a: 0, exp: "BCC = Blind Carbon Copy — recipients cannot see other BCC recipients." },

  // ======== NUMERICAL ABILITY (25) ========
  { id: 196, section: 'math', q: "If CP = ₹500 and SP = ₹600, profit % is:", o: ["15%", "20%", "25%", "10%"], a: 1, exp: "Profit = 600 − 500 = 100. Profit% = (100/500)×100 = 20%." },
  { id: 197, section: 'math', q: "A alone can do work in 10 days, B in 15 days. Together:", o: ["5 days", "6 days", "8 days", "12.5 days"], a: 1, exp: "Together = (10×15)/(10+15) = 150/25 = 6 days." },
  { id: 198, section: 'math', q: "A train 150 m long at 72 km/h crosses a pole in:", o: ["5 sec", "7.5 sec", "10 sec", "15 sec"], a: 1, exp: "72 km/h = 20 m/s. Time = 150/20 = 7.5 sec." },
  { id: 199, section: 'math', q: "Simple interest on ₹2000 at 5% p.a. for 3 years:", o: ["₹200", "₹300", "₹400", "₹500"], a: 1, exp: "SI = PRT/100 = (2000×5×3)/100 = ₹300." },
  { id: 200, section: 'math', q: "The ratio 2:3 converted to percentage of 2:3 = ?", o: ["2 is 66.67% of 3", "2 is 50% of 3", "2 is 75% of 3", "2 is 33% of 3"], a: 0, exp: "2/3 × 100 = 66.67%." },
  { id: 201, section: 'math', q: "Successive discounts of 10% and 5% equal a single discount of:", o: ["14.5%", "15%", "13.5%", "12%"], a: 0, exp: "Net = a+b-ab/100 = -10-5+(50/100) = -14.5%. Single discount = 14.5%." },
  { id: 202, section: 'math', q: "The average of first 10 natural numbers is:", o: ["4.5", "5", "5.5", "6"], a: 2, exp: "Sum = n(n+1)/2 = 55. Average = 55/10 = 5.5." },
  { id: 203, section: 'math', q: "LCM of 12 and 18 is:", o: ["36", "24", "72", "18"], a: 0, exp: "12 = 2²×3; 18 = 2×3². LCM = 2²×3² = 36." },
  { id: 204, section: 'math', q: "HCF of 24 and 36 is:", o: ["6", "8", "12", "18"], a: 2, exp: "24 = 2³×3; 36 = 2²×3². HCF = 2²×3 = 12." },
  { id: 205, section: 'math', q: "If a:b = 2:3 and b:c = 4:5, then a:b:c =", o: ["2:3:5", "8:12:15", "2:4:5", "4:6:15"], a: 1, exp: "Make b common: 2:3 ×4 → 8:12; 4:5 ×3 → 12:15. So a:b:c = 8:12:15." },
  { id: 206, section: 'math', q: "Area of a circle with radius 7 cm (π = 22/7):", o: ["44 cm²", "154 cm²", "49 cm²", "22 cm²"], a: 1, exp: "Area = πr² = (22/7)×49 = 154 cm²." },
  { id: 207, section: 'math', q: "Circumference of circle with radius 14 cm (π = 22/7):", o: ["44 cm", "88 cm", "154 cm", "196 cm"], a: 1, exp: "C = 2πr = 2×(22/7)×14 = 88 cm." },
  { id: 208, section: 'math', q: "Volume of a cube of side 5 cm:", o: ["25 cm³", "75 cm³", "125 cm³", "150 cm³"], a: 2, exp: "V = a³ = 5³ = 125 cm³." },
  { id: 209, section: 'math', q: "20% of 250 is:", o: ["40", "50", "60", "45"], a: 1, exp: "20/100 × 250 = 50." },
  { id: 210, section: 'math', q: "Compound Interest on ₹1000 at 10% for 2 years:", o: ["₹200", "₹210", "₹220", "₹215"], a: 1, exp: "A = 1000(1.1)² = 1210. CI = 210." },
  { id: 211, section: 'math', q: "Speed 54 km/h in m/s is:", o: ["10 m/s", "12 m/s", "15 m/s", "18 m/s"], a: 2, exp: "54 × 5/18 = 15 m/s." },
  { id: 212, section: 'math', q: "If x + 1/x = 2, then x² + 1/x² = ?", o: ["2", "3", "4", "6"], a: 0, exp: "(x+1/x)² = x² + 1/x² + 2. So 4 = x² + 1/x² + 2 → x² + 1/x² = 2." },
  { id: 213, section: 'math', q: "A boat goes 20 km downstream in 2 hrs, 20 km upstream in 4 hrs. Stream speed:", o: ["2.5 km/h", "5 km/h", "7.5 km/h", "10 km/h"], a: 0, exp: "Down = 10 km/h; Up = 5 km/h. Stream = (10-5)/2 = 2.5 km/h." },
  { id: 214, section: 'math', q: "The next number in the series 2, 6, 12, 20, 30, ?", o: ["36", "40", "42", "44"], a: 2, exp: "Differences: 4, 6, 8, 10, next = 12. 30+12 = 42." },
  { id: 215, section: 'math', q: "If RAM is coded as TCO, then HOT is coded as:", o: ["JQV", "IPS", "KRW", "IQS"], a: 0, exp: "Each letter shifts by +2. H→J, O→Q, T→V = JQV." },
  { id: 216, section: 'math', q: "Find the odd one: 25, 49, 81, 100, 121", o: ["25", "49", "100", "121"], a: 2, exp: "All are squares of odd numbers except 100 (10²)." },
  { id: 217, section: 'math', q: "A sum doubles in 8 years at simple interest. Rate =", o: ["10%", "12.5%", "15%", "8%"], a: 1, exp: "If A=2P, SI=P. Rate = 100/T = 100/8 = 12.5%." },
  { id: 218, section: 'math', q: "Average speed for equal distances at 40 and 60 km/h:", o: ["48 km/h", "50 km/h", "45 km/h", "55 km/h"], a: 0, exp: "Avg = 2xy/(x+y) = 2×40×60/100 = 48 km/h." },
  { id: 219, section: 'math', q: "A man buys an article at 20% discount on marked price and sells it at marked price. Profit % =", o: ["20%", "25%", "30%", "40%"], a: 1, exp: "MP=100, CP=80, SP=100. Profit% = 20/80×100 = 25%." },
  { id: 220, section: 'math', q: "If 5 men can do a work in 20 days, how many days will 10 men take?", o: ["5", "10", "15", "40"], a: 1, exp: "M₁D₁ = M₂D₂ → 5×20 = 10×D → D = 10 days." }
];

const SECTIONS = {
  jk: { name: 'J&K Static GK', color: '#C9A961', short: 'J&K GK' },
  ca: { name: 'Current Affairs', color: '#8B5A3C', short: 'Current' },
  eng: { name: 'General English', color: '#5C7A89', short: 'English' },
  cs: { name: 'Computer Knowledge', color: '#6B8E4E', short: 'Computer' },
  math: { name: 'Numerical & Reasoning', color: '#A0522D', short: 'Math' }
};

export default function JKSSBApp() {
  const [screen, setScreen] = useState('home'); // home, quiz, results, review
  const [selectedSection, setSelectedSection] = useState('all');
  const [mode, setMode] = useState('practice'); // practice or exam
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [bookmarks, setBookmarks] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('jkssb_bookmarks');
      return saved ? new Set<number>(JSON.parse(saved)) : new Set<number>();
    } catch { return new Set<number>(); }
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const activeQuestions = useMemo(() => {
    if (selectedSection === 'all') return MCQS;
    if (selectedSection === 'bookmarks') return MCQS.filter(q => bookmarks.has(q.id));
    return MCQS.filter(q => q.section === selectedSection);
  }, [selectedSection, bookmarks]);

  useEffect(() => {
    if (screen !== 'quiz' || mode !== 'exam' || timeLeft === null) return;
    if (timeLeft <= 0) { setScreen('results'); return; }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, screen, mode]);

  const startQuiz = (section, m) => {
    setSelectedSection(section);
    setMode(m);
    setCurrentIdx(0);
    setAnswers({});
    setShowExplanation({});
    const qs = section === 'all' ? MCQS : section === 'bookmarks' ? MCQS.filter(q => bookmarks.has(q.id)) : MCQS.filter(q => q.section === section);
    if (qs.length === 0) return;
    if (m === 'exam') setTimeLeft(qs.length * 48);
    else setTimeLeft(null);
    setScreen('quiz');
  };

  const selectAnswer = (qid, idx) => {
    if (answers[qid] !== undefined && mode === 'practice') return;
    setAnswers({ ...answers, [qid]: idx });
    if (mode === 'practice') {
      setShowExplanation({ ...showExplanation, [qid]: true });
    }
  };

  const toggleBookmark = (qid: number) => {
    const nb = new Set(bookmarks);
    if (nb.has(qid)) nb.delete(qid); else nb.add(qid);
    setBookmarks(nb);
    try { localStorage.setItem('jkssb_bookmarks', JSON.stringify([...nb])); } catch {}
  };

  const nextQ = () => currentIdx < activeQuestions.length - 1 && setCurrentIdx(currentIdx + 1);
  const prevQ = () => currentIdx > 0 && setCurrentIdx(currentIdx - 1);

  const score = useMemo(() => {
    let correct = 0, wrong = 0, unanswered = 0;
    activeQuestions.forEach(q => {
      if (answers[q.id] === undefined) unanswered++;
      else if (answers[q.id] === q.a) correct++;
      else wrong++;
    });
    const marks = correct - (wrong * 0.25);
    return { correct, wrong, unanswered, marks: marks.toFixed(2), total: activeQuestions.length };
  }, [answers, activeQuestions]);

  const fmtTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  // ============ HOME SCREEN ============
  if (screen === 'home') {
    const sectionCounts = Object.keys(SECTIONS).reduce((acc, k) => {
      acc[k] = MCQS.filter(q => q.section === k).length;
      return acc;
    }, {});

    return (
      <div style={{ minHeight: '100vh', background: '#F5F1E8', fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40, borderBottom: '3px double #8B5A3C', paddingBottom: 24 }}>
            <div style={{ display: 'inline-block', background: '#8B5A3C', color: '#F5F1E8', padding: '4px 16px', fontSize: 11, letterSpacing: 3, marginBottom: 12, fontFamily: 'Georgia, serif' }}>
              EST. 2026 · EXAM DAY EDITION
            </div>
            <h1 style={{ fontSize: 42, fontWeight: 900, color: '#2C1810', margin: '8px 0', letterSpacing: -1, fontFamily: 'Georgia, serif' }}>
              JKSSB <span style={{ color: '#C9A961' }}>Junior Assistant</span>
            </h1>
            <p style={{ color: '#5C4A3A', fontSize: 15, fontStyle: 'italic', margin: 0 }}>
              220+ MCQ Practice Bank · 19 April 2026
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
            {[
              { label: 'Questions', val: MCQS.length, icon: BookOpen },
              { label: 'Sections', val: 5, icon: Target },
              { label: 'Bookmarked', val: bookmarks.size, icon: Award },
              { label: 'Time/Q', val: '48s', icon: Clock }
            ].map((s, i) => (
              <div key={i} style={{ background: '#FFF9EF', padding: 14, textAlign: 'center', border: '1px solid #D4B896' }}>
                <s.icon size={18} style={{ color: '#8B5A3C', marginBottom: 4 }} />
                <div style={{ fontSize: 24, fontWeight: 700, color: '#2C1810' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: '#8B5A3C', letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick start */}
          <div style={{ background: '#2C1810', color: '#F5F1E8', padding: 24, marginBottom: 24, position: 'relative' }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: '#C9A961', marginBottom: 8 }}>▸ QUICK START</div>
            <h2 style={{ margin: '0 0 16px 0', fontSize: 24, fontFamily: 'Georgia, serif' }}>Practice all 220 questions</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => startQuiz('all', 'practice')} style={btnPrimary}>
                Practice Mode →
              </button>
              <button onClick={() => startQuiz('all', 'exam')} style={btnSecondary}>
                Exam Mode (Timed)
              </button>
            </div>
          </div>

          {/* Section cards */}
          <div style={{ fontSize: 11, letterSpacing: 3, color: '#8B5A3C', marginBottom: 12 }}>▸ BROWSE BY SECTION</div>
          <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
            {Object.entries(SECTIONS).map(([key, sec]) => (
              <div key={key} style={{ background: '#FFF9EF', border: '1px solid #D4B896', padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${sec.color}` }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#2C1810' }}>{sec.name}</div>
                  <div style={{ fontSize: 13, color: '#5C4A3A' }}>{sectionCounts[key]} questions</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startQuiz(key, 'practice')} style={btnSmall}>Practice</button>
                  <button onClick={() => startQuiz(key, 'exam')} style={{ ...btnSmall, background: sec.color, color: 'white', border: 'none' }}>Test</button>
                </div>
              </div>
            ))}
            {bookmarks.size > 0 && (
              <div style={{ background: '#FFF9EF', border: '1px solid #D4B896', padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '6px solid #C9A961' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#2C1810' }}>⭐ Bookmarked Questions</div>
                  <div style={{ fontSize: 13, color: '#5C4A3A' }}>{bookmarks.size} saved for review</div>
                </div>
                <button onClick={() => startQuiz('bookmarks', 'practice')} style={btnSmall}>Review</button>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', color: '#8B5A3C', fontSize: 12, fontStyle: 'italic', padding: 20, borderTop: '1px solid #D4B896' }}>
            Best of luck for your examination tomorrow. Negative marking: 0.25 per wrong answer.
          </div>
        </div>
      </div>
    );
  }

  // ============ QUIZ SCREEN ============
  if (screen === 'quiz') {
    const q = activeQuestions[currentIdx];
    if (!q) return <div>No questions</div>;
    const userAns = answers[q.id];
    const isAnswered = userAns !== undefined;
    const showExp = showExplanation[q.id] || (mode === 'practice' && isAnswered);
    const sec = SECTIONS[q.section];
    const progress = ((currentIdx + 1) / activeQuestions.length) * 100;

    return (
      <div style={{ minHeight: '100vh', background: '#F5F1E8', fontFamily: 'Georgia, serif', paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setScreen('home')} style={{ background: 'transparent', border: '1px solid #8B5A3C', color: '#8B5A3C', padding: '6px 12px', cursor: 'pointer', fontSize: 12, letterSpacing: 1, fontFamily: 'inherit' }}>
              ← HOME
            </button>
            {mode === 'exam' && timeLeft !== null && (
              <div style={{ background: timeLeft < 60 ? '#B23B3B' : '#2C1810', color: '#F5F1E8', padding: '6px 14px', fontSize: 14, fontWeight: 700 }}>
                ⏱ {fmtTime(timeLeft)}
              </div>
            )}
            <button onClick={() => setScreen('results')} style={{ background: '#8B5A3C', color: '#F5F1E8', border: 'none', padding: '6px 12px', cursor: 'pointer', fontSize: 12, letterSpacing: 1, fontFamily: 'inherit' }}>
              SUBMIT
            </button>
          </div>

          {/* Progress */}
          <div style={{ background: '#D4B896', height: 4, marginBottom: 20, position: 'relative' }}>
            <div style={{ width: `${progress}%`, background: '#8B5A3C', height: '100%', transition: 'width 0.3s' }}></div>
          </div>

          {/* Question card */}
          <div style={{ background: '#FFF9EF', padding: 24, border: '1px solid #D4B896', borderTop: `6px solid ${sec.color}`, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, fontSize: 11, letterSpacing: 2, color: '#8B5A3C' }}>
              <span>Q {currentIdx + 1} / {activeQuestions.length}</span>
              <span style={{ background: sec.color, color: 'white', padding: '2px 8px' }}>{sec.short.toUpperCase()}</span>
              <button onClick={() => toggleBookmark(q.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>
                {bookmarks.has(q.id) ? '⭐' : '☆'}
              </button>
            </div>

            <div style={{ fontSize: 18, color: '#2C1810', marginBottom: 20, lineHeight: 1.5, fontWeight: 500 }}>
              {q.q}
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.o.map((opt, idx) => {
                const isSel = userAns === idx;
                const isCorrect = idx === q.a;
                let bg = '#F5F1E8', border = '#D4B896', color = '#2C1810';
                if (isAnswered && (mode === 'practice' || showExp)) {
                  if (isCorrect) { bg = '#DCF0DC'; border = '#6B8E4E'; }
                  else if (isSel && !isCorrect) { bg = '#F5D6D6'; border = '#B23B3B'; }
                } else if (isSel) {
                  bg = '#FFE8B0'; border = '#C9A961';
                }
                return (
                  <button key={idx} onClick={() => selectAnswer(q.id, idx)}
                    disabled={mode === 'practice' && isAnswered}
                    style={{
                      background: bg, border: `2px solid ${border}`, color, padding: '12px 16px',
                      textAlign: 'left', cursor: (mode === 'practice' && isAnswered) ? 'default' : 'pointer',
                      fontSize: 15, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 12,
                      transition: 'all 0.2s'
                    }}>
                    <span style={{ fontWeight: 700, minWidth: 24 }}>{String.fromCharCode(65 + idx)}.</span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {isAnswered && (mode === 'practice' || showExp) && isCorrect && <Check size={18} color="#6B8E4E" />}
                    {isAnswered && (mode === 'practice' || showExp) && isSel && !isCorrect && <X size={18} color="#B23B3B" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && (
              <div style={{ marginTop: 18, padding: 14, background: '#FFF3D6', borderLeft: '4px solid #C9A961' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: '#8B5A3C', marginBottom: 6 }}>▸ EXPLANATION</div>
                <div style={{ fontSize: 14, color: '#2C1810', lineHeight: 1.5 }}>
                  <strong>Correct: {String.fromCharCode(65 + q.a)}. {q.o[q.a]}</strong>
                  <div style={{ marginTop: 6 }}>{q.exp}</div>
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <button onClick={prevQ} disabled={currentIdx === 0}
              style={{ ...btnNav, opacity: currentIdx === 0 ? 0.4 : 1 }}>
              <ChevronLeft size={16} /> Previous
            </button>
            {currentIdx < activeQuestions.length - 1 ? (
              <button onClick={nextQ} style={btnNav}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => setScreen('results')} style={{ ...btnNav, background: '#8B5A3C', color: 'white', border: 'none' }}>
                Finish →
              </button>
            )}
          </div>

          {/* Mini nav grid */}
          <div style={{ marginTop: 24, padding: 14, background: '#FFF9EF', border: '1px solid #D4B896' }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: '#8B5A3C', marginBottom: 10 }}>▸ JUMP TO QUESTION</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {activeQuestions.map((qq, i) => {
                const a = answers[qq.id];
                let bg = '#F5F1E8', col = '#8B5A3C';
                if (a !== undefined) {
                  if (mode === 'practice') {
                    bg = a === qq.a ? '#6B8E4E' : '#B23B3B'; col = 'white';
                  } else { bg = '#8B5A3C'; col = 'white'; }
                }
                if (i === currentIdx) { bg = '#2C1810'; col = 'white'; }
                return (
                  <button key={i} onClick={() => setCurrentIdx(i)}
                    style={{ width: 30, height: 30, background: bg, color: col, border: '1px solid #D4B896', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit' }}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ RESULTS SCREEN ============
  if (screen === 'results') {
    const percent = ((score.correct / score.total) * 100).toFixed(1);
    return (
      <div style={{ minHeight: '100vh', background: '#F5F1E8', fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: '#8B5A3C' }}>▸ RESULTS</div>
            <h1 style={{ fontSize: 36, color: '#2C1810', margin: '8px 0' }}>Your Performance</h1>
          </div>

          <div style={{ background: '#2C1810', color: '#F5F1E8', padding: 30, textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 14, letterSpacing: 3, color: '#C9A961', marginBottom: 8 }}>FINAL SCORE</div>
            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{score.marks}</div>
            <div style={{ fontSize: 14, color: '#C9A961', marginTop: 8 }}>out of {score.total} · {percent}% accuracy</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 24 }}>
            <div style={{ ...statCard, borderTopColor: '#6B8E4E' }}>
              <div style={{ fontSize: 36, color: '#6B8E4E', fontWeight: 700 }}>{score.correct}</div>
              <div style={{ fontSize: 12, color: '#5C4A3A', letterSpacing: 1 }}>CORRECT</div>
            </div>
            <div style={{ ...statCard, borderTopColor: '#B23B3B' }}>
              <div style={{ fontSize: 36, color: '#B23B3B', fontWeight: 700 }}>{score.wrong}</div>
              <div style={{ fontSize: 12, color: '#5C4A3A', letterSpacing: 1 }}>WRONG</div>
            </div>
            <div style={{ ...statCard, borderTopColor: '#8B5A3C' }}>
              <div style={{ fontSize: 36, color: '#8B5A3C', fontWeight: 700 }}>{score.unanswered}</div>
              <div style={{ fontSize: 12, color: '#5C4A3A', letterSpacing: 1 }}>SKIPPED</div>
            </div>
          </div>

          <div style={{ background: '#FFF3D6', padding: 14, marginBottom: 20, borderLeft: '4px solid #C9A961', fontSize: 13, color: '#5C4A3A' }}>
            💡 Calculation: {score.correct} correct − ({score.wrong} × 0.25 negative) = <strong>{score.marks} marks</strong>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setScreen('review')} style={btnPrimary}>
              Review Answers
            </button>
            <button onClick={() => setScreen('home')} style={btnSecondary}>
              <RotateCcw size={14} style={{ marginRight: 6 }} /> Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ REVIEW SCREEN ============
  if (screen === 'review') {
    return (
      <div style={{ minHeight: '100vh', background: '#F5F1E8', fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <button onClick={() => setScreen('results')} style={{ background: 'transparent', border: '1px solid #8B5A3C', color: '#8B5A3C', padding: '6px 12px', cursor: 'pointer', fontSize: 12, letterSpacing: 1, fontFamily: 'inherit' }}>
              ← BACK TO RESULTS
            </button>
            <div style={{ fontSize: 12, color: '#8B5A3C', letterSpacing: 2 }}>REVIEW MODE</div>
          </div>

          {activeQuestions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.a;
            const sec = SECTIONS[q.section];
            return (
              <div key={q.id} style={{ background: '#FFF9EF', padding: 18, border: '1px solid #D4B896', borderLeft: `6px solid ${userAns === undefined ? '#8B5A3C' : isCorrect ? '#6B8E4E' : '#B23B3B'}`, marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, color: '#8B5A3C', letterSpacing: 1 }}>
                  <span>Q {i + 1} · {sec.short.toUpperCase()}</span>
                  <span>{userAns === undefined ? 'SKIPPED' : isCorrect ? '✓ CORRECT' : '✗ WRONG'}</span>
                </div>
                <div style={{ fontSize: 16, color: '#2C1810', marginBottom: 12, fontWeight: 500 }}>{q.q}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {q.o.map((opt, idx) => {
                    const isAns = idx === q.a;
                    const isUser = idx === userAns;
                    let bg = '#F5F1E8', border = '#D4B896';
                    if (isAns) { bg = '#DCF0DC'; border = '#6B8E4E'; }
                    else if (isUser && !isAns) { bg = '#F5D6D6'; border = '#B23B3B'; }
                    return (
                      <div key={idx} style={{ background: bg, padding: '8px 12px', border: `1px solid ${border}`, fontSize: 14, color: '#2C1810', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <strong>{String.fromCharCode(65 + idx)}.</strong>
                        <span style={{ flex: 1 }}>{opt}</span>
                        {isAns && <Check size={16} color="#6B8E4E" />}
                        {isUser && !isAns && <X size={16} color="#B23B3B" />}
                      </div>
                    );
                  })}
                </div>
                <div style={{ background: '#FFF3D6', padding: 10, borderLeft: '3px solid #C9A961', fontSize: 13, color: '#2C1810' }}>
                  <strong style={{ color: '#8B5A3C' }}>Explanation: </strong>{q.exp}
                </div>
              </div>
            );
          })}

          <button onClick={() => setScreen('home')} style={{ ...btnPrimary, width: '100%', marginTop: 20 }}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ============ STYLES ============
const btnPrimary = {
  background: '#C9A961',
  color: '#2C1810',
  border: 'none',
  padding: '12px 24px',
  fontSize: 14,
  letterSpacing: 2,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'Georgia, serif',
  textTransform: 'uppercase'
};
const btnSecondary = {
  background: 'transparent',
  color: '#F5F1E8',
  border: '1px solid #C9A961',
  padding: '12px 24px',
  fontSize: 14,
  letterSpacing: 2,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'Georgia, serif',
  textTransform: 'uppercase'
};
const btnSmall = {
  background: 'transparent',
  border: '1px solid #8B5A3C',
  color: '#8B5A3C',
  padding: '6px 14px',
  fontSize: 12,
  letterSpacing: 1,
  cursor: 'pointer',
  fontFamily: 'Georgia, serif',
  textTransform: 'uppercase',
  fontWeight: 600
};
const btnNav = {
  flex: 1,
  background: '#FFF9EF',
  border: '1px solid #8B5A3C',
  color: '#2C1810',
  padding: '12px 20px',
  fontSize: 14,
  cursor: 'pointer',
  fontFamily: 'Georgia, serif',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6
};
const statCard = {
  background: '#FFF9EF',
  padding: 20,
  textAlign: 'center' as const,
  border: '1px solid #D4B896',
  borderTop: '4px solid'
};
