-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2021 a las 11:47:08
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospital`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `idconsulta` int(11) NOT NULL,
  `cantPacientes` int(11) NOT NULL,
  `nombreEspecialista` varchar(45) NOT NULL,
  `tipoConsulta` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `pacientesAtendidos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `consulta`
--

INSERT INTO `consulta` (`idconsulta`, `cantPacientes`, `nombreEspecialista`, `tipoConsulta`, `estado`, `pacientesAtendidos`) VALUES
(1, 10, 'Alejandro Sanchez Espitia', 1, 1, 1),
(2, 20, 'Nataly Aguilar', 2, 2, 2),
(3, 10, 'Evellyn Polanco Aguilar', 3, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idestado` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idestado`, `nombre`) VALUES
(1, 'Ocupada'),
(2, 'Desocupada'),
(3, 'En espera de atención al paciente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informe`
--

CREATE TABLE `informe` (
  `idinforme` int(11) NOT NULL,
  `idpaciente` int(11) NOT NULL,
  `idconsulta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `informe`
--

INSERT INTO `informe` (`idinforme`, `idpaciente`, `idconsulta`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1),
(6, 1, 1),
(7, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `idpaciente` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `noHistoriaClinica` int(30) NOT NULL,
  `fumador` tinyint(1) DEFAULT NULL,
  `anosFumador` int(11) DEFAULT NULL,
  `tieneDieta` tinyint(1) DEFAULT NULL,
  `relacionPesoEstatura` int(11) DEFAULT NULL,
  `prioridad` int(11) NOT NULL,
  `riesgo` int(11) NOT NULL,
  `enAtencion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`idpaciente`, `nombre`, `edad`, `noHistoriaClinica`, `fumador`, `anosFumador`, `tieneDieta`, `relacionPesoEstatura`, `prioridad`, `riesgo`, `enAtencion`) VALUES
(1, 'fdsdf', 45, 345, NULL, NULL, NULL, NULL, 0, 0, 1),
(2, 'Alejandro', 23, 12345678, 1, 23, NULL, NULL, 0, 0, 0),
(3, 'fgh', 34, 4534, 0, NULL, NULL, NULL, 0, 0, 1),
(4, 'anciano', 56, 6789, 0, NULL, NULL, NULL, 0, 0, 0),
(5, 'acianos', 56, 678678, NULL, NULL, 1, NULL, 0, 0, 0),
(6, 'nino', 3, 4567898, NULL, NULL, 1, NULL, 0, 0, 0),
(7, 'ninos', 3, 567567, NULL, NULL, NULL, 6, 0, 0, 1),
(8, 'alejito', 3, 567, NULL, NULL, NULL, 4, 43, 0, 1),
(9, 'nataly', 3, 690, NULL, NULL, NULL, 4, 43, 0, 1),
(10, 'catalina', 3, 376, NULL, NULL, NULL, 4, 43, 0, 1),
(11, 'bladimir', 3, 4567, NULL, NULL, NULL, 0, 3, 0, 0),
(12, 'nancy', 3, 2356, NULL, NULL, NULL, 4, 7, 0, 1),
(13, 'joven no fumador', 23, 1234, 0, NULL, NULL, NULL, 0, 0, 1),
(14, 'joven fumador', 25, 456, 1, 2, NULL, NULL, 0, 0, 0),
(15, 'no fuma', 34, 567, 0, NULL, NULL, NULL, 0, 0, 0),
(16, 'no', 36, 567, 0, NULL, NULL, NULL, 0, 0, 1),
(17, 'obvo no', 27, 6786, 0, NULL, NULL, NULL, 0, 0, 1),
(18, 'obvo no', 27, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(19, 'obvo no', 27, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(20, 'obvo', 27, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(21, 'obvo', 27, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(22, 'obvo', 27, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(23, 'obvo', 28, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(24, 'obvo', 28, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(25, 'obvo', 28, 6786, 0, NULL, NULL, NULL, 0, 0, 0),
(26, 'carmen', 32, 676, 0, NULL, NULL, NULL, 0, 0, 0),
(27, 'nunca fuma', 25, 45456, 0, NULL, NULL, NULL, 2, 0, 0),
(28, 'paciente que si fuma', 26, 45645, 1, 8, NULL, NULL, 4, 0, 0),
(29, 'anciano con dieta', 67, 345345, NULL, NULL, 1, NULL, 0, 0, 0),
(30, 'anciano con dieta', 67, 345345, NULL, NULL, 1, NULL, 0, 0, 0),
(31, 'anciano con dieta', 67, 345345, NULL, NULL, 1, NULL, 0, 0, 0),
(32, 'anciano sin dieta', 67, 345345, NULL, NULL, 0, NULL, 5, 0, 0),
(33, 'paciente con una dieta', 60, 60, NULL, NULL, 1, NULL, 7, 0, 1),
(34, 'ancianito', 67, 678678, NULL, NULL, 1, NULL, 7, 10, 1),
(35, '', 60, 0, NULL, NULL, 0, NULL, 5, 8, 0),
(36, '', 60, 0, NULL, NULL, 0, NULL, 5, 8, 0),
(37, '', 0, 4353, NULL, NULL, 0, NULL, 5, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_consulta`
--

CREATE TABLE `tipo_consulta` (
  `idtipo_consuta` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_consulta`
--

INSERT INTO `tipo_consulta` (`idtipo_consuta`, `nombre`) VALUES
(1, 'PEDIATRIA'),
(2, 'URGENCIAS'),
(3, 'MEDICINA INTEGRAL');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`idconsulta`),
  ADD KEY `tipoConsulta` (`tipoConsulta`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idestado`);

--
-- Indices de la tabla `informe`
--
ALTER TABLE `informe`
  ADD PRIMARY KEY (`idinforme`),
  ADD KEY `idpaciente` (`idpaciente`),
  ADD KEY `idconsulta` (`idconsulta`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`idpaciente`);

--
-- Indices de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  ADD PRIMARY KEY (`idtipo_consuta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `idconsulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `informe`
--
ALTER TABLE `informe`
  MODIFY `idinforme` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `idpaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT de la tabla `tipo_consulta`
--
ALTER TABLE `tipo_consulta`
  MODIFY `idtipo_consuta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_fk` FOREIGN KEY (`tipoConsulta`) REFERENCES `tipo_consulta` (`idtipo_consuta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estado_fk` FOREIGN KEY (`estado`) REFERENCES `estado` (`idestado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `informe`
--
ALTER TABLE `informe`
  ADD CONSTRAINT `paciente_fk` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tipo_consulta_fk` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`idconsulta`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
