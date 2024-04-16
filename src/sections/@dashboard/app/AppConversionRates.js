import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card,Typography, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const [filterValue, setFilterValue] = useState('all'); // Valeur par défaut du filtre

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    // Vous pouvez ajouter ici la logique pour mettre à jour le graphique en fonction de la valeur du filtre
  };

  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: true }, // Afficher le marqueur au survol
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      line: {
        borderRadius: 2, // Bord arrondi pour la ligne
        markers: {
          // Afficher les points de données
          size: 6,
          colors: ['#FFA41B'],
          strokeColors: '#fff',
          strokeWidth: 2,
        },
      },
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        show: true, // Afficher les étiquettes de l'axe X
        rotate: -10, // Rotation des étiquettes de l'axe X pour une meilleure lisibilité
        rotateAlways: true,
        minHeight: 40, // Hauteur minimale pour les étiquettes
        style: {
          fontSize: '10px', // Taille de police des étiquettes de l'axe X
        },
      },
      axisBorder: {
        show: false, // Masquer la bordure de l'axe X
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px', // Taille de police des étiquettes de l'axe Y
        },
      },
    },
    grid: {
      borderColor: '#f0f0f0', // Couleur de la ligne de grille
    },
    stroke: {
      curve: 'smooth', // Lissage de la courbe
    },
    legend: {
      show: true, // Afficher la légende
      fontSize: '12px', // Taille de police de la légende
      position: 'top', // Position de la légende
      offsetY: 10, // Décalage en y de la légende
    },
    dataLabels: {
      enabled: false, // Désactiver les étiquettes de données
    },
    animations: {
      enabled: true, // Activer les animations
      easing: 'easeinout', // Type d'animation
      speed: 800, // Vitesse de l'animation
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  });

  return (
    <Card {...other}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, fontFamily: 'Sk-Modernist' }}>
        <Box>
          <CardHeader title={title} />
        </Box>
        <Box>
          <Typography variant='body' color={'#6E6EF7'}>
              Visitors
            </Typography>
        </Box>
        <Box>
          <Typography variant='body' >
              Vehicles
            </Typography>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            {/* <InputLabel id="filter-label">Filtrer par</InputLabel> */}
            <Select
              labelId="filter-label"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <MenuItem value="all">Montly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
              {/* Autres options de filtrage */}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="line" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
