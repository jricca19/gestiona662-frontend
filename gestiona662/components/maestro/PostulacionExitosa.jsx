import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { estilosPostulacionExitosa } from '../styles/PostulacionExitosa'
import { format, parseISO } from 'date-fns'

const PostulacionExitosa = ({ route, navigation }) => {
    const { postulation } = route.params

    // Datos de la escuela y publicación
    const escuela = postulation.publicationId?.schoolId
    const clase = postulation.publicationId?.grade + (postulation.publicationId?.division || '')
    const turno = postulation.publicationId?.shift === 'MORNING'
        ? 'matutino'
        : postulation.publicationId?.shift === 'AFTERNOON'
        ? 'vespertino'
        : postulation.publicationId?.shift === 'FULL'
        ? 'completo'
        : postulation.publicationId?.shift

    // Días de postulación
    let dias = []
    if (postulation.appliesToAllDays && postulation.publicationId?.publicationDays) {
        dias = postulation.publicationId.publicationDays.map(d => d.date)
    } else if (postulation.postulationDays) {
        dias = postulation.postulationDays.map(d => d.date)
    }

    return (
        <View style={estilosPostulacionExitosa.contenedor}>
            <View style={estilosPostulacionExitosa.encabezado}>
                <Text style={estilosPostulacionExitosa.tituloEncabezado}>Postulado</Text>
            </View>
            <View style={estilosPostulacionExitosa.iconoContainer}>
                <Ionicons name="checkmark-circle" size={64} color="#009BDB" />
            </View>
            <Text style={estilosPostulacionExitosa.mensajePrincipal}>
                Tu postulación fué realizada correctamente
            </Text>
            <Text style={estilosPostulacionExitosa.mensajeSecundario}>
                Te comunicaremos el resultado de la selección
            </Text>
            <Text style={estilosPostulacionExitosa.tituloDetalle}>Detalles de la postulación</Text>
            <Text style={estilosPostulacionExitosa.detalle}>
                {escuela ? `Escuela Nº${escuela.schoolNumber}` : ''}
            </Text>
            <Text style={estilosPostulacionExitosa.detalle}>
                {escuela ? `Dirección ${escuela.address}${escuela.cityName ? ', ' + escuela.cityName : ''}${escuela.departmentId?.name ? ', ' + escuela.departmentId.name : ''}` : ''}
            </Text>
            <Text style={estilosPostulacionExitosa.detalle}>
                {clase ? `Clase ${clase}° - Turno ${turno}` : ''}
            </Text>
            <Text style={estilosPostulacionExitosa.tituloDias}>Días de tu postulación</Text>
            {dias.map((d, idx) => (
                <Text key={idx} style={estilosPostulacionExitosa.dia}>
                    {format(parseISO(d), 'dd/MM/yyyy')}
                </Text>
            ))}
            <Text style={estilosPostulacionExitosa.mensajeCancelar}>
                Tienes tiempo de cancelar antes de ser seleccionado.
            </Text>
            <TouchableOpacity
                style={estilosPostulacionExitosa.boton}
                onPress={() => navigation.replace('maestroTabs', { screen: 'misPostulaciones' })}
            >
                <Text style={estilosPostulacionExitosa.textoBoton}>Ver Postulaciones</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PostulacionExitosa
