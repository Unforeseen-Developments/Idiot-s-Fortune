document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Get references to all the HTML elements we need to interact with.
    const fortuneButton = document.getElementById('fortune-button');
    const initialSection = document.getElementById('initial-section');
    const fortuneSection = document.getElementById('fortune-section');
    const fortuneMessageDiv = document.getElementById('fortune-message');
    const beliefQuestionDiv = document.getElementById('belief-question');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const responseSection = document.getElementById('response-section');
    const responseMessageDiv = document.getElementById('response-message');
    const statsSection = document.getElementById('stats-section');
    const believerCountSpan = document.getElementById('believer-count'); // Removed - not using this display
    const nonBelieverCountSpan = document.getElementById('non-believer-count'); // Removed - not using this display
    const statsChartCanvas = document.getElementById('statsChart'); // Get the canvas element.

    // Translations (Includes all 5 languages and more messages) - Same as provided earlier.
    const translations = {
        en: {
            fortuneTitle: "Idiot Fortune",
            fortuneButton: "Get Your Fortune!",
            beliefQuestion: "Do You Believe This Fortune?",
            yesButton: "Yes",
            noButton: "No",
            statsTitle: "Idiot Statistics",
            believers: "Number of Believing Idiots: ",
            nonBelievers: "Number of Smart But Fortuneless Ones: ",
            footerText: "© 2024 Idiot Fortune - For Entertainment Purposes Only.",
            fortuneMessages: [
                "A significant event will happen when you least expect it, or maybe exactly when you expect it, who knows?",
                "Good news is coming from a place you've completely forgotten about, probably.",
                "You are entering a new phase in your love life...or maybe your goldfish's love life. Unclear.",
                "Be careful with your finances for a while. Especially if 'a while' means 'forever'.",
                "Today will be no ordinary day for you...or for anyone else, statistically.",
                "Listen to your inner voice, it might be just indigestion, but who knows, maybe it's guidance.",
                "Your lucky color today is plaid. No wait, polka dots. Actually, beige. Definitely beige.",
                "Prepare for an unexpected encounter. With a squirrel, possibly. Or maybe your mailman.",
                "The stars are aligned in your favor...for ordering pizza tonight.",
                "A journey awaits you. To the kitchen, for snacks.",
                "Success is within your reach...if your reach extends to the remote control.",
                "Don't make any rash decisions today, like deciding what to have for breakfast.",
                "Someone is thinking of you right now. Probably telemarketers.",
                "Opportunities will knock on your door. It's probably just the delivery guy.",
                "Happiness is just around the corner. Or maybe several corners. Keep walking.",
                "You will receive a valuable gift. A coupon, perhaps?",
                "Your future is bright. Mostly because the sun is out.",
                "Embrace change. Like changing your socks. Probably time.",
                "Let go of the past. Especially that embarrassing photo.",
                "Believe in yourself. Even if no one else does. Especially then.",
                "You will find love. Or at least like something mildly.",
                "Your pet is plotting something. Probably for treats.",
                "Expect the unexpected. Like Tuesdays.",
                "Your creativity will bloom... into a weed, maybe.",
                "Wealth and riches await... in your dreams.",
                "Take risks! Like trying a new flavor of instant noodles.",
                "You will be recognized for your achievements. By your cat.",
                "The answer is yes. To something. Probably.",
                "Patience is a virtue. Especially when waiting for internet to load.",
                "Something amazing is about to happen. Maybe. Don't hold your breath."
                // ... feel free to add even MORE funny fortune messages!
            ],
            idiotResponse: "GOOD JOB, IDIOT!",
            smartResponse: "Smart choice! It was just a fortune anyway."

        },
        tr: {
            fortuneTitle: "Gerizekalı Falı",
            fortuneButton: "Falına Bak!",
            beliefQuestion: "Bu Fal'a İnandın mı?",
            yesButton: "Evet",
            noButton: "Hayır",
            statsTitle: "Gerizekalı İstatistikleri",
            believers: "İnanan Gerizekalı Sayısı: ",
            nonBelievers: "Akıllı Ama Falsız Kalan Sayısı: ",
            footerText: "© 2024 Gerizekalı Falı - Tamamen Eğlence Amaçlıdır.",
            fortuneMessages: [
                "Hiç beklemediğin bir anda önemli bir olay olacak. Ya da tam beklediğin anda. Kim bilir?",
                "Unuttuğun bir yerden güzel haberler geliyor, muhtemelen.",
                "Aşk hayatında yeni bir döneme giriyorsun... Belki de Japon balığının aşk hayatında. Belli değil.",
                "Bir süre mali durumuna dikkat et. Özellikle 'bir süre' sonsuza kadar demekse.",
                "Bugün senin için sıradan bir gün olmayacak... Ya da istatistiksel olarak kimse için.",
                "İç sesini dinle, belki hazımsızlıktır ama kim bilir, belki de yol gösteriyordur.",
                "Bugün şanslı rengin ekose. Yok pardon, puantiyeli. Aslında bej. Kesinlikle bej.",
                "Beklenmedik bir karşılaşmaya hazırlan. Sincapla olabilir. Ya da belki postacıyla.",
                "Yıldızlar pizzacıdan pizza sipariş etmen için hizalanmış durumda.",
                "Seni bir yolculuk bekliyor. Mutfağa, atıştırmalık almaya.",
                "Başarı parmaklarının ucunda... Eğer uzaktan kumandaya kadar uzanabiliyorsa.",
                "Bugün aceleci kararlar alma, kahvaltıda ne yiyeceğine karar vermek gibi.",
                "Şu anda biri seni düşünüyor. Büyük ihtimalle tele pazarlamacılar.",
                "Fırsatlar kapını çalacak. Muhtemelen sadece kurye.",
                "Mutluluk hemen köşede. Ya da belki birkaç köşe ötede. Yürümeye devam.",
                "Değerli bir hediye alacaksın. Belki bir indirim kuponu?",
                "Geleceğin parlak. Çoğunlukla güneş çıktığı için.",
                "Değişimi kucakla. Çoraplarını değiştirmek gibi. Muhtemelen zamanı geldi.",
                "Geçmişi unut. Özellikle o utanç verici fotoğrafı.",
                "Kendine inan. Başkası inanmasa bile. Özellikle o zaman.",
                "Aşkı bulacaksın. Ya da en azından hafiften bir şeyleri beğenirsin.",
                "Evcil hayvanın bir şeyler planlıyor. Muhtemelen ödül maması için.",
                "Beklenmeyeni bekle. Salı günleri gibi.",
                "Yaratıcılığın yeşerecek... Belki bir yabani ot olarak.",
                "Servet ve zenginlik seni bekliyor... Rüyalarında.",
                "Risk al! Yeni bir hazır erişte aroması denemek gibi.",
                "Başarılarınla tanınacaksın. Kedin tarafından.",
                "Cevap evet. Bir şeye. Muhtemelen.",
                "Sabır bir erdemdir. Özellikle internetin yüklenmesini beklerken.",
                "Muhteşem bir şey olmak üzere. Belki. Çok da bekleme."
                // ... daha fazla komik, genel, veya absürt Türkçe fal mesajı ekleyin
            ],
            idiotResponse: "AFERİN SANA GERİZEKALI!",
            smartResponse: "Akıllı seçim! Zaten sadece bir faldı."
        },
        es: {
            fortuneTitle: "Adivinación Idiota",
            fortuneButton: "¡Obtén tu fortuna!",
            beliefQuestion: "¿Crees en esta fortuna?",
            yesButton: "Sí",
            noButton: "No",
            statsTitle: "Estadísticas de Idiotas",
            believers: "Número de Idiotas Creyentes: ",
            nonBelievers: "Número de Inteligentes Pero Sin Fortuna: ",
            footerText: "© 2024 Adivinación Idiota - Sólo para fines de entretenimiento.",
            fortuneMessages: [
                "Un evento significativo sucederá cuando menos lo esperes, o quizás exactamente cuando lo esperes, ¿quién sabe?",
                "Buenas noticias llegarán de un lugar que has olvidado por completo, probablemente.",
                "Estás entrando en una nueva fase de tu vida amorosa... o tal vez en la vida amorosa de tu pez dorado. No está claro.",
                "Ten cuidado con tus finanzas por un tiempo. Especialmente si 'un tiempo' significa 'para siempre'.",
                "Hoy no será un día ordinario para ti... o para nadie más, estadísticamente.",
                "Escucha tu voz interior, podría ser solo indigestión, pero quién sabe, tal vez sea una guía.",
                "Tu color de la suerte hoy es el tartán. No, espera, lunares. En realidad, beige. Definitivamente beige.",
                "Prepárate para un encuentro inesperado. Con una ardilla, posiblemente. O tal vez con tu cartero.",
                "Las estrellas se han alineado a tu favor... para pedir pizza esta noche.",
                "Un viaje te espera. A la cocina, por snacks.",
                "El éxito está a tu alcance... si tu alcance se extiende hasta el control remoto.",
                "No tomes decisiones precipitadas hoy, como decidir qué desayunar.",
                "Alguien está pensando en ti ahora mismo. Probablemente telemarketers.",
                "Oportunidades llamarán a tu puerta. Probablemente solo sea el repartidor.",
                "La felicidad está a la vuelta de la esquina. O tal vez varias esquinas. Sigue caminando.",
                "Recibirás un valioso regalo. ¿Un cupón, tal vez?",
                "Tu futuro es brillante. Principalmente porque el sol está afuera.",
                "Abraza el cambio. Como cambiarte los calcetines. Probablemente ya es hora.",
                "Deja ir el pasado. Especialmente esa foto vergonzosa.",
                "Cree en ti mismo. Incluso si nadie más lo hace. Especialmente entonces.",
                "Encontrarás el amor. O al menos algo que te guste un poco.",
                "Tu mascota está tramando algo. Probablemente por golosinas.",
                "Espera lo inesperado. Como los martes.",
                "Tu creatividad florecerá... en una mala hierba, tal vez.",
                "Riqueza y fortuna te esperan... en tus sueños.",
                "¡Toma riesgos! Como probar un nuevo sabor de fideos instantáneos.",
                "Serás reconocido por tus logros. Por tu gato.",
                "La respuesta es sí. A algo. Probablemente.",
                "La paciencia es una virtud. Especialmente cuando esperas que se cargue Internet.",
                "Algo increíble está a punto de suceder. Tal vez. No contengas la respiración.",
                 // ... feel free to add even MORE funny fortune messages in Spanish -  added some more below
                "Hoy es un buen día para... evitar el trabajo.",
                "Pronto recibirás noticias confusas, pero emocionantes. O no.",
                "Tu intuición te guiará... si tienes alguna.",
                "Los planetas te sonríen... sarcásticamente.",
                "La clave de tu felicidad está... en no tomarte esto demasiado en serio.",
                "Un extraño jugoso te espera... en la frutería.",
                "Te espera una sorpresa agradable... o al menos, una sorpresa.",
                "La abundancia fluye hacia ti... principalmente agua de la ducha.",
                "Conseguirás todo lo que deseas... si no deseas demasiado.",
                "Estás destinado a la grandeza... en un campo muy nicho, quizás.",
            ],
            idiotResponse: "¡BIEN HECHO, IDIOTA!",
            smartResponse: "¡Elección inteligente! De todos modos, era solo una fortuna."
        },
        de: {
            fortuneTitle: "Idioten-Wahrsagerei",
            fortuneButton: "Hol dir dein Vermögen!",
            beliefQuestion: "Glaubst du dieser Wahrsagerei?",
            yesButton: "Ja",
            noButton: "Nein",
            statsTitle: "Idioten-Statistiken",
            believers: "Anzahl der gläubigen Idioten: ",
            nonBelievers: "Anzahl der Klugen, aber Glücklosen: ",
            footerText: "© 2024 Idioten-Wahrsagerei - Nur zu Unterhaltungszwecken.",
            fortuneMessages: [
                "Ein wichtiges Ereignis wird passieren, wenn du es am wenigsten erwartest, oder vielleicht genau dann, wenn du es erwartest, wer weiß?",
                "Gute Nachrichten kommen von einem Ort, den du wahrscheinlich komplett vergessen hast.",
                "Du trittst in eine neue Phase deines Liebeslebens ein... oder vielleicht in das deines Goldfischs. Unklar.",
                "Sei eine Weile vorsichtig mit deinen Finanzen. Besonders, wenn 'eine Weile' 'für immer' bedeutet.",
                "Heute wird kein gewöhnlicher Tag für dich sein... oder für irgendjemanden anderen, statistisch gesehen.",
                "Höre auf deine innere Stimme, vielleicht ist es nur eine Verdauungsstörung, aber wer weiß, vielleicht ist es eine Führung.",
                "Deine Glücksfarbe heute ist Schottenmuster. Nein warte, Tupfen. Eigentlich Beige. Definitiv Beige.",
                "Bereite dich auf eine unerwartete Begegnung vor. Möglicherweise mit einem Eichhörnchen. Oder vielleicht mit deinem Postboten.",
                "Die Sterne stehen günstig für dich... um heute Abend Pizza zu bestellen.",
                "Eine Reise erwartet dich. In die Küche, für Snacks.",
                "Der Erfolg liegt in Reichweite... wenn deine Reichweite bis zur Fernbedienung reicht.",
                "Triff heute keine übereilten Entscheidungen, wie zum Beispiel, was du zum Frühstück essen sollst.",
                "Jemand denkt gerade an dich. Wahrscheinlich Telemarketer.",
                "Gelegenheiten werden an deine Tür klopfen. Wahrscheinlich ist es nur der Lieferant.",
                "Das Glück ist gleich um die Ecke. Oder vielleicht mehrere Ecken. Geh einfach weiter.",
                "Du wirst ein wertvolles Geschenk erhalten. Vielleicht einen Gutschein?",
                "Deine Zukunft ist rosig. Hauptsächlich, weil die Sonne scheint.",
                "Umarme die Veränderung. Wie das Wechseln deiner Socken. Wahrscheinlich ist es Zeit.",
                "Lass die Vergangenheit los. Besonders dieses peinliche Foto.",
                "Glaube an dich selbst. Auch wenn es sonst niemand tut. Besonders dann.",
                "Du wirst die Liebe finden. Oder zumindest etwas milde mögen.",
                "Dein Haustier plant etwas. Wahrscheinlich wegen Leckerlis.",
                "Erwarte das Unerwartete. Wie Dienstage.",
                "Deine Kreativität wird erblühen... in einem Unkraut, vielleicht.",
                "Reichtum und Wohlstand erwarten dich... in deinen Träumen.",
                "Geh Risiken ein! Wie das Ausprobieren einer neuen Geschmacksrichtung Instantnudeln.",
                "Du wirst für deine Leistungen anerkannt werden. Von deiner Katze.",
                "Die Antwort ist ja. Auf etwas. Wahrscheinlich.",
                "Geduld ist eine Tugend. Besonders beim Warten, bis das Internet geladen ist.",
                "Etwas Erstaunliches wird gleich passieren. Vielleicht. Halte nicht den Atem an.",
                // ... add more humorous, general, or absurd fortune messages in German.  Some examples below:
                "Heute ist ein guter Tag, um... die Arbeit zu vermeiden.",
                "Du wirst bald verwirrende, aber aufregende Nachrichten erhalten. Oder auch nicht.",
                "Deine Intuition wird dich leiten... wenn du überhaupt eine hast.",
                "Die Planeten lächeln dich an... sarkastisch.",
                "Der Schlüssel zu deinem Glück liegt... darin, das hier nicht zu ernst zu nehmen.",
                "Ein saftiger Fremder erwartet dich... im Obstladen.",
                "Eine angenehme Überraschung erwartet dich... oder zumindest eine Überraschung.",
                "Fülle fließt in dich... hauptsächlich Duschwasser.",
                "Du wirst alles bekommen, was du dir wünschst... wenn du dir nicht zu viel wünschst.",
                "Du bist zur Größe bestimmt... in einem sehr spezifischen Bereich, vielleicht.",
            ],
            idiotResponse: "GUTE ARBEIT, IDIOT!",
            smartResponse: "Kluge Wahl! Es war ja sowieso nur eine Wahrsagerei."
        },
        ar: {
            fortuneTitle: "تنبؤات الحمقى",
            fortuneButton: "احصل على تنبؤك!",
            beliefQuestion: "هل تصدق هذه التنبؤات؟",
            yesButton: "نعم",
            noButton: "لا",
            statsTitle: "إحصائيات الحمقى",
            believers: "عدد الحمقى المصدقين: ",
            nonBelievers: "عدد الأذكياء ولكن البائسين: ",
            footerText: "© 2024 تنبؤات الحمقى - للأغراض الترفيهية فقط.",
            fortuneMessages: [
                "سيحدث حدث مهم عندما لا تتوقعه على الإطلاق، أو ربما بالضبط عندما تتوقعه، من يدري؟",
                "أخبار جيدة قادمة من مكان نسيته تمامًا، على الأرجح.",
                "أنت تدخل مرحلة جديدة في حياتك العاطفية ... أو ربما في حياة سمكتك الذهبية. غير واضح.",
                "كن حذرًا بشأن أموالك لفترة من الوقت. خاصة إذا كانت 'فترة من الوقت' تعني 'إلى الأبد'.",
                "لن يكون اليوم يومًا عاديًا بالنسبة لك ... أو لأي شخص آخر، إحصائيًا.",
                "استمع إلى صوتك الداخلي، قد يكون مجرد عسر هضم، ولكن من يدري، ربما يكون توجيهاً.",
                "لون الحظ الخاص بك اليوم هو منقوش. لا، انتظر، منقط. في الواقع، بيج. بيج بالتأكيد.",
                "استعد لمواجهة غير متوقعة. مع سنجاب، ربما. أو ربما ساعي البريد الخاص بك.",
                "النجوم تصطف في صالحك ... لطلب البيتزا الليلة.",
                "رحلة تنتظرك. إلى المطبخ، للوجبات الخفيفة.",
                "النجاح في متناول يدك ... إذا امتدت يدك إلى جهاز التحكم عن بعد.",
                "لا تتخذ قرارات متهورة اليوم، مثل تحديد ما ستتناوله على الإفطار.",
                "شخص ما يفكر فيك الآن. ربما مسوقو الهاتف.",
                "الفرص ستدق بابك. ربما مجرد رجل التوصيل.",
                "السعادة على بعد زاوية. أو ربما عدة زوايا. استمر في المشي.",
                "سوف تتلقى هدية قيمة. قسيمة، ربما؟",
                "مستقبلك مشرق. في الغالب لأن الشمس مشرقة.",
                "احتضن التغيير. مثل تغيير جواربك. ربما حان الوقت.",
                "تخل عن الماضي. خاصة تلك الصورة المحرجة.",
                "آمن بنفسك. حتى لو لم يفعل أي شخص آخر. خاصة حينها.",
                "سوف تجد الحب. أو على الأقل تحب شيئًا ما باعتدال.",
                "حيوانك الأليف يخطط لشيء ما. ربما للحصول على الحلوى.",
                "توقع ما هو غير متوقع. مثل أيام الثلاثاء.",
                "سوف تزدهر إبداعيتك ... إلى حشيشة ضارة، ربما.",
                "الثروة والرخاء في انتظارك ... في أحلامك.",
                "خاطر! مثل تجربة نكهة جديدة من المعكرونة سريعة التحضير.",
                "سوف يتم الاعتراف بك لإنجازاتك. من قبل قطتك.",
                "الإجابة نعم. لشيء ما. ربما.",
                "الصبر فضيلة. خاصة عند الانتظار حتى يتم تحميل الإنترنت.",
                "شيء مذهل على وشك أن يحدث. ربما. لا تحبس أنفاسك.",
                // ... add more humorous, general, or absurd fortune messages in Arabic.  A few examples below:
                "اليوم يوم جيد لـ... تجنب العمل.",
                "سوف تتلقى قريبًا أخبارًا مربكة ولكنها مثيرة. أو لا.",
                "سوف ترشدك حدسك... إذا كان لديك أي.",
                "الكواكب تبتسم لك... بسخرية.",
                "مفتاح سعادتك يكمن في... عدم أخذ هذا على محمل الجد.",
                "غريب مثير ينتظرك... في محل بيع الفاكهة.",
                "مفاجأة سارة في انتظارك... أو على الأقل، مفاجأة.",
                "الوفرة تتدفق إليك... بشكل أساسي ماء من الدش.",
                "سوف تحصل على كل ما تتمناه... إذا لم تتمنى الكثير.",
                "أنت مقدر للعظمة... في مجال متخصص للغاية، ربما.",
            ],
            idiotResponse: "أحسنت، أيها الأحمق!",
            smartResponse: "خيار ذكي! كانت مجرد ثروة على أي حال."
        },
    };

    // Utility Functions

    // Function to get a random fortune message based on the current language
    function getRandomFortune(lang) {
        const messages = translations[lang].fortuneMessages;
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    // Function to fetch and display chart data
    async function fetchAndDisplayChart() {
        try {
            const response = await fetch('netlify/functions/update-stats', { // Correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'getStats' }) // dummy action to fetch the data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            //  Update chart with the fetched data - if data has the expected values.
            if (data && typeof data.yes === 'number' && typeof data.no === 'number' && typeof data.noResponse === 'number') {
                updateChart(data.yes, data.no, data.noResponse);
            } else {
                console.error("Invalid data from server:", data);
                // Display an error message in the stats section.
                const errorMessage = document.createElement('p');
                errorMessage.textContent = "Failed to load statistics.";
                statsSection.appendChild(errorMessage);
            }

        } catch (error) {
            console.error('Error fetching chart data:', error);
            // Display an error message in the stats section.
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Failed to load statistics.";
            statsSection.appendChild(errorMessage);
        }
    }

    // Function to send data to the Netlify function
    async function sendData(action) {
        try {
            const response = await fetch('netlify/functions/update-stats', { // Correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: action })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // Get the updated data (not used directly in this function)
            // fetchAndDisplayChart();  // Refresh the chart
            return data; // Return the data so we can trigger a chart update
        } catch (error) {
            console.error('Error sending data:', error);
            // Optionally, display an error message to the user
        }
    }



    // Function to create or update the chart
    let myChart;  // Store chart instance globally
    function updateChart(yesCount, noCount, noResponseCount) {
        if (myChart) {
            // If chart already exists, update the data
            myChart.data.datasets[0].data = [yesCount, noCount, noResponseCount];
            myChart.update();
        } else {
            // Create a new chart
            myChart = new Chart(statsChartCanvas, {
                type: 'bar',  // You can change this to 'pie', 'doughnut', etc.
                data: {
                    labels: [translations[document.documentElement.lang].yesButton, translations[document.documentElement.lang].noButton, "None"],  //Dynamic Labels
                    datasets: [{
                        label: translations[document.documentElement.lang].statsTitle,  //Dynamic Label
                        data: [yesCount, noCount, noResponseCount],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)', // Red (Yes)
                            'rgba(54, 162, 235, 0.7)', // Blue (No)
                            'rgba(255, 206, 86, 0.7)'  // Yellow (No Response)
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Clicks'
                            }
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: translations[document.documentElement.lang].statsTitle, // Dynamic Title
                        },
                        legend: {
                            display: false // Remove or customize the legend as needed
                        }
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20
                        }
                    }
                }
            });
        }
    }

    // Event Listeners

    fortuneButton.addEventListener('click', () => {
        // Get the current language (from HTML lang attribute)
        const currentLang = document.documentElement.lang;
        // Show fortune, hide initial section, generate fortune message
        initialSection.classList.add('hidden');
        fortuneSection.classList.remove('hidden');
        fortuneSection.classList.add('show');
        beliefQuestionDiv.classList.add('hidden'); // Hide question initially
        responseSection.classList.add('hidden'); // Hide the response initially

        fortuneMessageDiv.textContent = getRandomFortune(currentLang);

        // Show the "Believe?" question with a delay for the animation
        setTimeout(() => {
            beliefQuestionDiv.classList.remove('hidden');
            beliefQuestionDiv.classList.add('show');
        }, 500); // Match transition duration (approx.)
    });

    yesButton.addEventListener('click', async () => {
        // Hide the question, show the response
        beliefQuestionDiv.classList.remove('show');
        beliefQuestionDiv.classList.add('hidden');
        responseSection.classList.remove('hidden');
        responseSection.classList.add('show');

        // Get the current language for the response message
        const currentLang = document.documentElement.lang;
        responseMessageDiv.textContent = translations[currentLang].idiotResponse;

        // Send data to the server
        await sendData('yes');
         // Fetch and display the updated chart. Important to fetch *after* sending data
        await fetchAndDisplayChart();

    });

    noButton.addEventListener('click', async () => {
        // Hide the question, show the response
        beliefQuestionDiv.classList.remove('show');
        beliefQuestionDiv.classList.add('hidden');
        responseSection.classList.remove('hidden');
        responseSection.classList.add('show');

        // Get the current language for the response message
        const currentLang = document.documentElement.lang;
        responseMessageDiv.textContent = translations[currentLang].smartResponse;

        // Send data to the server
        await sendData('no');
        // Fetch and display the updated chart. Important to fetch *after* sending data
        await fetchAndDisplayChart();
    });

    // Initial chart load
    fetchAndDisplayChart(); // Load the chart when the page loads.

});