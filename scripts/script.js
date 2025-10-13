// Custom JS for the digital resume
        // Atualizar o ano no rodapé
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Botões que abrem o modal já estão configurados via data-bs-toggle

        /* ---------------------------------------------------------------------
           EmailJS CONFIGURATION (leave placeholders until you configure)
           ---------------------------------------------------------------------
           - Substitua os valores abaixo por:
             SERVICE_ID  -> ex: 'service_xxx'
             TEMPLATE_ID -> ex: 'template_xxx'
             PUBLIC_KEY  -> ex: 'user_xxx' (public key)
           - Instruções para criar/obter estas chaves estão no final do arquivo.
           ------------------------------------------------------------------ */
        const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
        const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        // Inicializa emailjs somente se você substituiu a key placeholder
        if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            try {
                emailjs.init(EMAILJS_PUBLIC_KEY);
            } catch (e) {
                console.warn('Erro inicializando EmailJS', e);
            }
        }

        // Animação das barras de habilidades (mantive o script original, com observer)
        document.addEventListener('DOMContentLoaded', function() {
            const skillBars = document.querySelectorAll('.skill-progress');

            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillBar = entry.target;
                        const width = skillBar.style.width;
                        skillBar.style.width = '0';

                        setTimeout(() => {
                            skillBar.style.width = width;
                        }, 300);

                        observer.unobserve(skillBar);
                    }
                });
            }, observerOptions);

            skillBars.forEach(bar => {
                observer.observe(bar);
            });

            // Envio do formulário
            const form = document.getElementById('contactForm');
            const feedback = document.getElementById('contact-feedback');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                feedback.style.display = 'none';
                feedback.className = '';
                feedback.innerHTML = '';

                // Coletar dados
                const formData = new FormData(form);
                const name = formData.get('from_name') || '';
                const email = formData.get('reply_to') || '';
                const phone = formData.get('phone') || '';
                const message = formData.get('message') || '';
                const source = formData.get('source') || 'Contato via Currículo Online - Daniel Vieira Ferreira';

                // Se EmailJS estiver configurado (substitua as constantes), envia via API do EmailJS
                const isEmailJsConfigured = EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
                    && EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID'
                    && EMAILJS_TEMPLATE_ID && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
                    && (typeof emailjs !== 'undefined');

                if (isEmailJsConfigured) {
                    // Envia usando send (usando template com parâmetros)
                    const templateParams = {
                        from_name: name,
                        reply_to: email,
                        phone: phone,
                        message: message,
                        source: source
                    };

                    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                        .then(function(response) {
                            feedback.style.display = 'block';
                            feedback.className = 'alert alert-success';
                            feedback.innerHTML = 'Mensagem enviada com sucesso! Obrigado.';

                            // reset form and close modal after short delay
                            form.reset();
                            setTimeout(() => {
                                const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                                modal.hide();
                            }, 1200);
                        }, function(error) {
                            feedback.style.display = 'block';
                            feedback.className = 'alert alert-danger';
                            feedback.innerHTML = 'Erro ao enviar a mensagem. Tente novamente mais tarde.';
                            console.error('EmailJS error', error);
                        });
                } else {
                    // Fallback: abrir mailto com preenchimento (útil enquanto não configurar EmailJS)
                    const subject = encodeURIComponent('Contato via Currículo Online - Daniel Vieira Ferreira');
                    let body = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}\n\n---\n${source}`;
                    body = encodeURIComponent(body);

                    // Construir mailto URL
                    const mailto = `mailto:danielvieiragnd177@gmail.com?subject=${subject}&body=${body}`;

                    // Abre cliente de email do usuário
                    window.location.href = mailto;
                }
            });

        });
