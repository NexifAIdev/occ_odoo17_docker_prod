FROM odoo:17

USER root

# Comprehensive Python dependencies for Odoo addons
RUN pip install --upgrade pip && \
    pip install pandas \
                mako\
                countryinfo \
                httpx==0.27.2 \
                xlsxwriter \
                icecream==2.1.3 \
                httpagentparser==1.9.5 \
                user-agents==2.2.0 \
                pylightxl==1.61 \
                beautifulsoup4 \
                requests \
                openpyxl \
                numpy \
                python-dateutil \
                phonenumbers \
                psycopg2-binary \
                qrcode \
                urllib3 \
                passlib \
                pytz \
                lxml \
                xmltodict \
                decorator \
                cryptography

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    sudo \
    openssh-client \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN usermod -s /bin/bash odoo \
    && echo "odoo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER odoo

RUN pip3 install --upgrade \
    autopep8 \
    pydevd-odoo \
    debugpy \
    coverage

ENV PATH=~/.local/bin:$PATH

COPY scripts/odoo_api.py /home/odoo/scripts/odoo_api.py
USER root
RUN chmod +x /home/odoo/scripts/odoo_api.py

# Switch back to the odoo user if needed
USER odoo

CMD ["odoo", "-c", "/etc/odoo/odoo.conf"]