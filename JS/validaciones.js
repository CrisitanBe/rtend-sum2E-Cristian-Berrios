document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('turnoForm');
  const especialidad = document.getElementById('especialidad');
  const medico = document.getElementById('medico');
  const modalidad = document.getElementById('modalidad');
  const plataformaWrap = document.getElementById('plataformaWrap');
  const cobertura = document.getElementById('cobertura');
  const credencialWrap = document.getElementById('credencialWrap');
  const primera = document.getElementById('primera');
  const comoWrap = document.getElementById('comoNosConocioWrap');
  const estudios = document.getElementById('estudios');
  const descEstudiosWrap = document.getElementById('descEstudiosWrap');

  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const dni = document.getElementById('dni');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const nacimiento = document.getElementById('nacimiento');
  const genero = document.getElementById('genero');
  const tipo = document.getElementById('tipo');
  const fechaTurno = document.getElementById('fecha_turno');
  const horaTurno = document.getElementById('hora_turno');
  const plataforma = document.getElementById('plataforma');
  const plan = document.getElementById('plan');
  const credencial = document.getElementById('credencial');
  const comoNosConocio = document.getElementById('como');
  const motivo = document.getElementById('motivo');
  const descEstudios = document.getElementById('desc_estudios');

  const medicosPorEspecialidad = {
    clinica: ['Dr. Gomez, Carlos', 'Dra. Lopez, Maria'],
    cardiologia: ['Dr. Perez, Juan', 'Dra. Torres, Ana'],
    pediatria: ['Dra. Diaz, Laura', 'Dr. Soto, Pablo'],
    ginecologia: ['Dra. Romero, Valeria', 'Dra. Castro, Elena'],
    traumatologia: ['Dr. Ramos, Sergio', 'Dr. Herrera, Diego'],
    neurologia: ['Dr. Molina, Andres', 'Dra. Vargas, Cecilia']
  };

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
  const regexDni = /^\d{7,8}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[+\d\s-]{8,}$/;
  const regexAlfanumerico = /^[a-zA-Z0-9]{5,}$/;

  const setStatus = (field, valid, message = '') => {
    removeMessage(field);
    field.classList.remove('campo-ok', 'campo-error');
    if (valid) {
      field.classList.add('campo-ok');
    } else {
      field.classList.add('campo-error');
      if (message) createMessage(field, message);
    }
  };

  const createMessage = (field, message) => {
    const error = document.createElement('p');
    error.className = 'mensaje-error';
    error.textContent = message;
    field.parentNode.insertBefore(error, field.nextSibling);
  };

  const removeMessage = (field) => {
    const next = field.nextElementSibling;
    if (next && next.classList.contains('mensaje-error')) {
      next.remove();
    }
  };

  const actualizarMedicos = () => {
    const esp = especialidad.value;
    medico.innerHTML = '<option value="" disabled selected>Seleccione médico</option>';
    medico.disabled = true;
    if (medicosPorEspecialidad[esp]) {
      medicosPorEspecialidad[esp].forEach((nombreMedico) => {
        const opt = document.createElement('option');
        opt.value = nombreMedico;
        opt.textContent = nombreMedico;
        medico.appendChild(opt);
      });
      medico.disabled = false;
    }
  };

  const showOrHide = () => {
    plataformaWrap.style.display = modalidad.value === 'Videoconsulta' ? 'block' : 'none';
    if (modalidad.value !== 'Videoconsulta') plataforma.selectedIndex = 0;

    credencialWrap.style.display = cobertura.value && cobertura.value !== 'Particular' ? 'block' : 'none';
    if (cobertura.value === 'Particular' || !cobertura.value) {
      credencial.value = '';
      plan.value = '';
    }

    comoWrap.style.display = primera.checked ? 'block' : 'none';
    if (!primera.checked) comoNosConocio.selectedIndex = 0;

    descEstudiosWrap.style.display = estudios.checked ? 'block' : 'none';
    if (!estudios.checked) descEstudios.value = '';
  };

  const getDateFromInput = (input) => {
    return input.value ? new Date(input.value + 'T00:00:00') : null;
  };

  const validateField = () => {
    let valid = true;
    const invalidFields = [];

    const markInvalid = (field, message) => {
      setStatus(field, false, message);
      if (!invalidFields.includes(field)) invalidFields.push(field);
      valid = false;
    };

    const markValid = (field) => {
      setStatus(field, true);
    };

    // Nombre
    if (!nombre.value.trim()) {
      markInvalid(nombre, 'El nombre es obligatorio.');
    } else if (!regexName.test(nombre.value.trim())) {
      markInvalid(nombre, 'El nombre solo puede contener letras y espacios.');
    } else {
      markValid(nombre);
    }

    // Apellido
    if (!apellido.value.trim()) {
      markInvalid(apellido, 'El apellido es obligatorio.');
    } else if (!regexName.test(apellido.value.trim())) {
      markInvalid(apellido, 'El apellido solo puede contener letras y espacios.');
    } else {
      markValid(apellido);
    }

    // DNI
    if (!dni.value.trim()) {
      markInvalid(dni, 'El DNI es obligatorio.');
    } else if (!regexDni.test(dni.value.trim())) {
      markInvalid(dni, 'El DNI debe tener entre 7 y 8 dígitos numéricos.');
    } else {
      markValid(dni);
    }

    // Email
    if (!email.value.trim()) {
      markInvalid(email, 'El email es obligatorio.');
    } else if (!regexEmail.test(email.value.trim())) {
      markInvalid(email, 'El email no tiene un formato válido.');
    } else {
      markValid(email);
    }

    // Teléfono
    if (!telefono.value.trim()) {
      markInvalid(telefono, 'El teléfono es obligatorio.');
    } else if (!regexPhone.test(telefono.value.trim()) || telefono.value.replace(/\D/g, '').length < 8) {
      markInvalid(telefono, 'El teléfono debe tener al menos 8 dígitos y solo puede incluir +, espacios o guiones.');
    } else {
      markValid(telefono);
    }

    // Fecha de nacimiento
    if (!nacimiento.value) {
      markInvalid(nacimiento, 'La fecha de nacimiento es obligatoria.');
    } else {
      const fechaNac = new Date(nacimiento.value);
      const hoy = new Date();
      if (fechaNac > hoy) {
        markInvalid(nacimiento, 'La fecha de nacimiento no puede ser futura.');
      } else {
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        const m = hoy.getMonth() - fechaNac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
          edad--;
        }
        if (edad < 0 || edad > 120) {
          markInvalid(nacimiento, 'La edad debe estar entre 0 y 120 años.');
        } else {
          markValid(nacimiento);
        }
      }
    }

    // Especialidad
    if (!especialidad.value) {
      markInvalid(especialidad, 'La especialidad es obligatoria.');
    } else {
      markValid(especialidad);
    }

    // Médico
    if (especialidad.value) {
      if (!medico.value || medico.disabled) {
        markInvalid(medico, 'El médico es obligatorio.');
      } else {
        markValid(medico);
      }
    } else {
      removeStatus(medico);
    }

    // Tipo de consulta
    if (!tipo.value) {
      markInvalid(tipo, 'El tipo de consulta es obligatorio.');
    } else {
      markValid(tipo);
    }

    // Fecha del turno
    if (!fechaTurno.value) {
      markInvalid(fechaTurno, 'La fecha del turno es obligatoria.');
    } else {
      const fecha = new Date(fechaTurno.value + 'T00:00:00');
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const diaSemana = fecha.getDay();
      if (fecha < hoy) {
        markInvalid(fechaTurno, 'La fecha del turno no puede ser pasada.');
      } else if (diaSemana === 0 || diaSemana === 6) {
        markInvalid(fechaTurno, 'El turno debe ser en día hábil (lunes a viernes).');
      } else if (horaTurno.value) {
        const [h, m] = horaTurno.value.split(':').map(Number);
        const fechaTurnoCompleta = new Date(fechaTurno.value + 'T' + horaTurno.value + ':00');
        const diferenciaMs = fechaTurnoCompleta - new Date();
        if (diferenciaMs < 1000 * 60 * 60 * 24) {
          markInvalid(fechaTurno, 'El turno debe solicitarse con al menos 24 horas de anticipación.');
        } else {
          markValid(fechaTurno);
        }
      } else {
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        manana.setHours(0, 0, 0, 0);
        if (fecha < manana) {
          markInvalid(fechaTurno, 'El turno debe solicitarse con al menos 24 horas de anticipación.');
        } else {
          markValid(fechaTurno);
        }
      }
    }

    // Hora del turno
    if (!horaTurno.value) {
      markInvalid(horaTurno, 'La hora del turno es obligatoria.');
    } else {
      const [h, m] = horaTurno.value.split(':').map(Number);
      const minutos = h * 60 + m;
      const inicio = 8 * 60;
      const fin = 20 * 60;
      if (minutos < inicio || minutos > fin) {
        markInvalid(horaTurno, 'La hora debe estar entre 08:00 y 20:00.');
      } else {
        markValid(horaTurno);
      }
    }

    // Modalidad
    if (!modalidad.value) {
      markInvalid(modalidad, 'La modalidad es obligatoria.');
    } else {
      markValid(modalidad);
    }

    // Plataforma preferida
    if (modalidad.value === 'Videoconsulta') {
      if (!plataforma.value) {
        markInvalid(plataforma, 'La plataforma preferida es obligatoria para videoconsulta.');
      } else {
        markValid(plataforma);
      }
    } else {
      removeStatus(plataforma);
    }

    // Cobertura
    if (!cobertura.value) {
      markInvalid(cobertura, 'La cobertura es obligatoria.');
    } else {
      markValid(cobertura);
    }

    // Número de credencial y Plan
    if (cobertura.value && cobertura.value !== 'Particular') {
      if (!credencial.value.trim()) {
        markInvalid(credencial, 'El número de credencial es obligatorio.');
      } else if (!regexAlfanumerico.test(credencial.value.trim())) {
        markInvalid(credencial, 'El número de credencial debe tener al menos 5 caracteres alfanuméricos.');
      } else {
        markValid(credencial);
      }

      if (!plan.value.trim()) {
        markInvalid(plan, 'El plan es obligatorio.');
      } else {
        markValid(plan);
      }
    } else {
      removeStatus(credencial);
      removeStatus(plan);
    }

    // Cómo nos conoció
    if (primera.checked) {
      if (!comoNosConocio.value) {
        markInvalid(comoNosConocio, 'Debe indicar cómo nos conoció.');
      } else {
        markValid(comoNosConocio);
      }
    } else {
      removeStatus(comoNosConocio);
    }

    // Motivo de consulta
    if (!motivo.value.trim()) {
      markInvalid(motivo, 'El motivo de consulta es obligatorio.');
    } else if (motivo.value.trim().length < 20) {
      markInvalid(motivo, 'El motivo debe tener al menos 20 caracteres.');
    } else {
      markValid(motivo);
    }

    // Descripción de estudios
    if (estudios.checked) {
      if (!descEstudios.value.trim()) {
        markInvalid(descEstudios, 'La descripción de estudios es obligatoria.');
      } else if (descEstudios.value.trim().length < 20) {
        markInvalid(descEstudios, 'La descripción debe tener al menos 20 caracteres.');
      } else {
        markValid(descEstudios);
      }
    } else {
      removeStatus(descEstudios);
    }

    return invalidFields;
  };

  const removeStatus = (field) => {
    field.classList.remove('campo-error', 'campo-ok');
    removeMessage(field);
  };

  especialidad.addEventListener('change', () => {
    actualizarMedicos();
    showOrHide();
  });
  modalidad.addEventListener('change', showOrHide);
  cobertura.addEventListener('change', showOrHide);
  primera.addEventListener('change', showOrHide);
  estudios.addEventListener('change', showOrHide);

  const confirmationMessage = document.getElementById('confirmationMessage');

  const formatTurnoId = () => {
    return 'TURN-' + Math.floor(10000 + Math.random() * 90000);
  };

  const hideConfirmation = () => {
    confirmationMessage.style.display = 'none';
    confirmationMessage.innerHTML = '';
  };

  const showConfirmation = (turnoId) => {
    confirmationMessage.innerHTML = `
      <strong>Turno confirmado</strong>
      <p>Paciente: ${nombre.value.trim()} ${apellido.value.trim()}</p>
      <p>Especialidad: ${especialidad.options[especialidad.selectedIndex].text}</p>
      <p>Fecha: ${fechaTurno.value} - Hora: ${horaTurno.value}</p>
      <p>Número de turno: <strong>${turnoId}</strong></p>
    `;
    confirmationMessage.style.display = 'block';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    hideConfirmation();
    const invalidFields = validateField();
    if (invalidFields.length > 0) {
      invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const turnoId = formatTurnoId();
    showConfirmation(turnoId);
    form.reset();
    showOrHide();
    medico.innerHTML = '<option value="" disabled selected>Seleccione médico</option>';
    medico.disabled = true;
    const campos = form.querySelectorAll('.campo-ok');
    campos.forEach((field) => field.classList.remove('campo-ok'));
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      plataformaWrap.style.display = 'none';
      credencialWrap.style.display = 'none';
      comoWrap.style.display = 'none';
      descEstudiosWrap.style.display = 'none';
      medico.innerHTML = '<option value="" disabled selected>Seleccione médico</option>';
      medico.disabled = true;
      const fields = form.querySelectorAll('input, select, textarea');
      fields.forEach((field) => removeStatus(field));
    }, 0);
  });

  showOrHide();
});
