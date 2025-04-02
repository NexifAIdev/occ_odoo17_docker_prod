# ====== Base Image ======
FROM odoo:17

# ====== Metadata ======
LABEL maintainer="Your Name <youremail@example.com>"
LABEL description="Custom Odoo 17 Dockerfile with envsubst and waiting for PostgreSQL"

# ====== Set User and Path ======
USER root
ENV PATH="/home/odoo/.local/bin:$PATH"

# ====== Python Dependencies ======
COPY requirements.txt /home/odoo/requirements.txt
RUN pip install --upgrade pip && \
    pip install --ignore-installed --no-cache-dir -r /home/odoo/requirements.txt

# ====== System Utilities ======
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    sudo \
    openssh-client \
    git && \
    rm -rf /var/lib/apt/lists/*

# ====== Configure Odoo User ======
RUN usermod -s /bin/bash odoo && \
    echo "odoo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# ====== Create log directory for Odoo ======
RUN mkdir -p /var/log/odoo && chown -R odoo:odoo /var/log/odoo

# ====== Copy and Set Entrypoint ======
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# ====== Switch to Odoo User ======
USER odoo

# ====== Developer Tools ======
RUN pip3 install --upgrade \
    autopep8 \
    pydevd-odoo \
    debugpy \
    coverage

# ====== Additional Scripts ======
COPY scripts/odoo_api.py /home/odoo/scripts/odoo_api.py

# ====== Make Script Executable ======
USER root
RUN chmod +x /home/odoo/scripts/odoo_api.py

# ====== Final User ======
USER odoo

# ====== Entrypoint ======
CMD ["odoo", "-c", "/etc/odoo/odoo.conf", "-u", "all"]