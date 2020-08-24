-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 24, 2020 at 10:23 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `frames`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail`
--

CREATE TABLE `audit_trail` (
  `id` int(14) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `activity` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `audit_trail`
--

INSERT INTO `audit_trail` (`id`, `user_id`, `activity`, `date`) VALUES
(2783, 'LMLS-KB-0001', 'Logged In', '2020-05-27 12:42:17'),
(2784, 'LMLS-KB-0001', 'Added Patient \"Robert Ntow Adjei Laryea\"', '2020-05-27 12:43:01'),
(2785, 'LMLS-KB-0001', 'Added Request For Robert Adjei Laryea', '2020-05-27 12:44:02'),
(2786, 'LMLS-KB-0001', 'Made Payment Of GHS108 For Robert  Adjei Laryea\'s Request', '2020-05-27 12:44:48'),
(2787, 'LMLS-KB-0001', 'Tried To Add Patient \"Trial Ntow Adjei-laryea\" But Email Address \"trial@admin.com\" Was Already Used', '2020-05-27 12:45:19'),
(2788, 'LMLS-KB-0001', 'Tried To Add Patient \"Trial Ntow Adjei-laryea\" But Email Address \"trial@admin.comm\" Was Already Used', '2020-05-27 12:45:24'),
(2789, 'LMLS-KB-0001', 'Tried To Add Patient \"Trial Ntow Adjei-laryea\" But Email Address \"trial@admin.comm\" Was Already Used', '2020-05-27 12:45:32'),
(2790, 'LMLS-KB-0001', 'Added Patient \"Trial Ntow Adjei-laryea\"', '2020-05-27 12:45:37'),
(2791, 'LMLS-KB-0001', 'Added Request For Trial Ntow Adjei-laryea', '2020-05-27 12:45:57'),
(2792, 'LMLS-KB-0001', 'Made Payment Of GHS200 For Trial Ntow Adjei-laryea\'s Request', '2020-05-27 12:46:16'),
(2793, 'LMLS-KB-0001', 'Made Payment Of GHS70 For Trial Ntow Adjei-laryea\'s Request', '2020-05-27 12:47:36'),
(2794, 'LMLS-KB-0001', 'Completed Request For Trial Ntow Adjei-laryea', '2020-05-27 12:48:03'),
(2796, 'LMLS-KB-0001', 'Viewed Receipt For Trial Ntow Adjei-laryea', '2020-05-27 12:48:14'),
(2797, 'LMLS-KB-0001', 'Added Antenatal Screening Lab For Robert  Adjei Laryea', '2020-05-27 12:50:01'),
(2798, 'LMLS-KB-0001', 'Viewed Receipt For Trial Ntow Adjei-laryea', '2020-05-27 12:58:13'),
(2799, 'LMLS-KB-0001', 'Added Patient \"Agyakwa Mireku\"', '2020-05-27 13:41:17'),
(2800, 'LMLS-KB-0001', 'Added Patient \"Michelle Admin\"', '2020-05-27 13:47:48'),
(2801, 'LMLS-KB-0001', 'Added Request For Michelle Admin', '2020-05-27 13:49:18'),
(2802, 'LMLS-KB-0001', 'Made Payment Of GHS130 For Michelle  Admin\'s Request', '2020-05-27 13:49:37'),
(2804, 'LMLS-KB-0001', 'Viewed Alpha Feto Protein Report From 01 January 2020 To 28 May 2020', '2020-05-27 19:43:41'),
(2805, 'LMLS-KB-0001', 'Viewed Alpha Feto Protein Report From 01 January 2020 To 28 May 2020', '2020-05-27 19:44:02'),
(2807, 'LMLS-KB-0001', 'Logged Out', '2020-05-27 19:45:56'),
(3349, 'LMLS-AMA-0004', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-07-10 14:50:55'),
(3350, 'LMLS-AMA-0004', 'Logged In', '2020-07-10 14:51:45'),
(3352, 'LMLS-AMA-0004', 'Logged In', '2020-07-10 14:58:14'),
(3357, 'LMLS-KB-0000', 'Logged In', '2020-07-10 15:39:13'),
(3358, 'LMLS-KB-0002', 'Logged In', '2020-07-10 15:39:28'),
(3359, 'LMLS-AMA-0002', 'Logged In', '2020-07-10 15:39:48'),
(3369, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 13:44:15'),
(3371, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:05:13'),
(3373, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:05:29'),
(3374, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:05:38'),
(3375, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:06:11'),
(3376, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:08:08'),
(3377, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:08:17'),
(3378, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:08:40'),
(3379, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:09:33'),
(3380, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:09:50'),
(3381, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:11:26'),
(3382, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:11:34'),
(3383, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:12:21'),
(3384, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:12:27'),
(3385, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:13:01'),
(3386, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:13:09'),
(3387, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:16:26'),
(3388, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:16:32'),
(3389, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:21:14'),
(3391, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:21:53'),
(3392, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 17:21:56'),
(3393, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 17:22:14'),
(3394, 'LMLS-AMA-0002', 'Logged In', '2020-07-11 17:22:58'),
(3395, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 20:22:07'),
(3397, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 20:22:24'),
(3398, 'LMLS-AMA-0002', 'Logged In', '2020-07-11 20:22:29'),
(3400, 'LMLS-AMA-0002', 'Logged Out', '2020-07-11 23:28:17'),
(3401, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:28:24'),
(3402, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:28:32'),
(3403, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:28:48'),
(3404, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:28:57'),
(3405, 'LMLS-AMA-0004', 'Logged In', '2020-07-11 23:29:02'),
(3406, 'LMLS-AMA-0004', 'Logged Out', '2020-07-11 23:30:40'),
(3407, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:30:44'),
(3408, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:31:12'),
(3409, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:31:14'),
(3410, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:31:52'),
(3411, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:32:01'),
(3412, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:32:06'),
(3413, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:32:10'),
(3414, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:33:06'),
(3415, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:34:08'),
(3416, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:34:21'),
(3417, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:34:41'),
(3418, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:34:56'),
(3419, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:35:10'),
(3420, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:35:57'),
(3421, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:37:49'),
(3422, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:37:51'),
(3423, 'LMLS-KB-0000', 'Logged Out', '2020-07-11 23:38:37'),
(3424, 'LMLS-KB-0000', 'Logged In', '2020-07-11 23:38:52'),
(3426, 'LMLS-KB-0000', 'Logged Out', '2020-07-12 00:32:05'),
(3427, 'LMLS-KB-0000', 'Logged In', '2020-07-12 00:32:11'),
(3428, 'LMLS-KB-0000', 'Logged Out', '2020-07-12 00:32:16'),
(3429, 'LMLS-KB-0000', 'Logged In', '2020-07-12 00:32:19'),
(3430, 'LMLS-KB-0000', 'Logged Out', '2020-07-12 00:35:28'),
(3431, 'LMLS-KB-0000', 'Logged In', '2020-07-12 11:19:28'),
(3433, 'LMLS-KB-0000', 'Logged Out', '2020-07-12 11:39:17'),
(3434, 'LMLS-KB-0000', 'Logged In', '2020-07-12 11:39:25'),
(3437, 'LMLS-KB-0000', 'Logged Out', '2020-07-12 16:44:14'),
(3438, 'LMLS-KB-0000', 'Logged In', '2020-07-12 16:44:16'),
(3439, 'LMLS-KB-0000', 'Logged Out', '2020-07-12 16:44:22'),
(3440, 'LMLS-KB-0000', 'Logged In', '2020-07-12 16:45:02'),
(3441, 'LMLS-KB-0000', 'Logged In', '2020-07-12 16:45:47'),
(3442, 'LMLS-KB-0000', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-07-12 16:47:56'),
(3443, 'LMLS-KB-0000', 'Logged In', '2020-07-12 16:48:02'),
(3444, 'LMLS-KB-0000', 'Logged In', '2020-07-12 19:16:45'),
(3445, 'LMLS-KB-0000', 'Logged In', '2020-07-12 22:31:14'),
(3448, 'LMLS-KB-0000', 'Logged In', '2020-07-12 23:46:48'),
(3451, 'LMLS-KB-0000', 'Tried To Add Patient \"Bismark Adjei Bediako\" But Email Address \"bismark@bediako.com.gh\" Was Already Used', '2020-07-13 16:31:10'),
(3452, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:36:52'),
(3453, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:48:33'),
(3454, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:50:41'),
(3455, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:52:39'),
(3456, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:55:24'),
(3457, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:56:51'),
(3458, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:58:42'),
(3459, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 16:59:42'),
(3460, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 17:02:33'),
(3461, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 18:09:29'),
(3462, 'LMLS-KB-0000', 'Added Patient \"Bismark Adjei Bediako\"', '2020-07-13 18:10:42'),
(3463, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bablerry Bediako\"', '2020-07-13 18:31:20'),
(3464, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bediako\"', '2020-07-13 18:32:37'),
(3465, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bablerry Bediako\"', '2020-07-13 18:33:38'),
(3466, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bediako\"', '2020-07-13 18:33:56'),
(3467, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bablerry Bediako\"', '2020-07-13 18:36:39'),
(3468, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bediako\"', '2020-07-13 18:36:59'),
(3469, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bablerry Bediako\"', '2020-07-13 18:38:49'),
(3470, 'LMLS-KB-0000', 'Updated Patient \"Bismark Adjei Bediako\"', '2020-07-13 18:39:02'),
(3471, 'LMLS-KB-0000', 'Tried To Add Patient \"Bismark Adjei Bediako\" But Email Address \"maria@nortey.com\" Was Already Used', '2020-07-13 18:54:33'),
(3472, 'LMLS-KB-0000', 'Unblocked Moses Narh Tetteh', '2020-07-14 00:04:16'),
(3473, 'LMLS-KB-0000', 'Blocked Moses Narh Tetteh', '2020-07-14 00:05:37'),
(3474, 'LMLS-KB-0000', 'Unblocked Rita Ekua Yamoah', '2020-07-14 00:07:09'),
(3475, 'LMLS-KB-0000', 'Blocked Rita Ekua Yamoah', '2020-07-14 00:08:18'),
(3476, 'LMLS-KB-0000', 'Unblocked Rita Ekua Yamoah', '2020-07-14 00:08:29'),
(3477, 'LMLS-KB-0000', 'Blocked Moses Narh Tetteh', '2020-07-14 00:08:38'),
(3478, 'LMLS-KB-0000', 'Updated Patient \"Michelle Koduah\"', '2020-07-14 00:40:15'),
(3479, 'LMLS-KB-0000', 'Updated Patient \"Robert Ntow Adjei Laryea\"', '2020-07-14 00:40:55'),
(3480, 'LMLS-KB-0000', 'Updated Patient \"Trial Ntow Adjei-laryea\"', '2020-07-14 00:41:22'),
(3481, 'LMLS-AMA-0002', 'Tried To Add Staff \"Moses Narh Tetteh\" But Email Address \"moses@tetteh.com\" Was Already Used', '2020-07-14 00:45:10'),
(3482, 'LMLS-KB-0000', 'Updated Staff \"Moses Narh Tetteh\"', '2020-07-14 01:04:33'),
(3483, 'LMLS-KB-0000', 'Updated Staff \"Moses Narh Tetteh\"', '2020-07-14 01:04:52'),
(3484, 'LMLS-KB-0000', 'Tried To Add Staff \"Bismark Adjei Bediako\" But Email Address \"bismark@bediako.com.gh\" Was Already Used', '2020-07-14 15:36:52'),
(3485, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:37:16'),
(3486, 'LMLS-KB-0000', 'Tried To Add Staff \"Bismark Adjei Bediako\" But Email Address \"bismark@bediako.com.gh\" Was Already Used', '2020-07-14 15:40:08'),
(3487, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:40:22'),
(3488, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:41:38'),
(3489, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 15:42:17'),
(3490, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 15:43:01'),
(3491, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:44:17'),
(3492, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 15:45:38'),
(3493, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:47:25'),
(3494, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:47:59'),
(3495, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:48:37'),
(3496, 'LMLS-KB-0000', 'Tried To Add Staff \"Bismark Adjei Bediako\" But Email Address \"bismark@bediako.com.gh\" Was Already Used', '2020-07-14 15:49:57'),
(3497, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:50:05'),
(3498, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:51:54'),
(3499, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:55:27'),
(3500, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:59:07'),
(3501, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 15:59:38'),
(3502, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 16:00:05'),
(3503, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 16:03:57'),
(3504, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 16:05:09'),
(3505, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 16:05:34'),
(3506, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 16:06:00'),
(3507, 'LMLS-KB-0000', 'Added Staff \"Bismark Bediako\"', '2020-07-14 16:06:31'),
(3508, 'LMLS-EL-0004', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-07-14 16:07:04'),
(3509, 'LMLS-KB-0000', 'Added Staff \"Bismark Adjei Bediako\"', '2020-07-14 16:12:39'),
(3510, 'LMLS-EL-0000', 'Logged In', '2020-07-14 16:12:56'),
(3512, 'LMLS-EL-0000', 'Logged Out', '2020-07-14 16:13:34'),
(3513, 'LMLS-EL-0000', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-07-14 16:14:02'),
(3514, 'LMLS-EL-0000', 'Logged In', '2020-07-14 16:14:07'),
(3515, 'LMLS-KB-0000', 'Blocked Bismark Adjei Bediako', '2020-07-14 16:24:07'),
(3516, 'LMLS-KB-0000', 'Unblocked Bismark Adjei Bediako', '2020-07-14 16:24:26'),
(3517, 'LMLS-KB-0000', 'Blocked Bismark Adjei Bediako', '2020-07-14 16:24:36'),
(3518, 'LMLS-EL-0000', 'Logged Out', '2020-07-14 16:24:54'),
(3519, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 16:25:04'),
(3520, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 16:25:08'),
(3521, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 16:25:10'),
(3522, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 16:25:12'),
(3523, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 16:25:14'),
(3524, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 16:25:17'),
(3526, 'LMLS-KB-0000', 'Logged Out', '2020-07-14 17:39:43'),
(3538, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 17:56:58'),
(3539, 'LMLS-EL-0000', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-14 17:57:03'),
(3541, 'LMLS-EL-0000', 'Logged In', '2020-07-14 17:57:28'),
(3542, 'LMLS-AMA-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-07-14 18:00:49'),
(3543, 'LMLS-AMA-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-07-14 18:00:53'),
(3558, 'LMLS-KB-0001', 'Logged In', '2020-07-15 05:48:53'),
(3560, 'LMLS-KB-0001', 'Viewed Report From 01 January 2020 To 16 July 2020', '2020-07-15 05:49:05'),
(3561, 'LMLS-KB-0001', 'Viewed Report From 01 January 2020 To 16 July 2020', '2020-07-15 05:52:42'),
(3562, 'LMLS-KB-0001', 'Viewed Report From 01 January 2020 To 16 July 2020', '2020-07-15 05:55:37'),
(3563, 'LMLS-KB-0001', 'Viewed Report From 03 January 2020 To 16 July 2020', '2020-07-15 05:56:36'),
(3564, 'LMLS-KB-0001', 'Viewed Report From 01 February 2020 To 16 July 2020', '2020-07-15 05:57:57'),
(3565, 'LMLS-KB-0001', 'Viewed Report From 31 January 2020 To 16 July 2020', '2020-07-15 05:59:55'),
(3566, 'LMLS-KB-0001', 'Viewed Report From 03 January 2020 To 16 July 2020', '2020-07-15 06:01:00'),
(3567, 'LMLS-KB-0001', 'Viewed Report From 31 January 2020 To 16 July 2020', '2020-07-15 06:02:15'),
(3568, 'LMLS-KB-0001', 'Viewed Report From 03 January 2020 To 16 July 2020', '2020-07-15 06:04:26'),
(3570, 'LMLS-KB-0001', 'Viewed Report From 31 August 2019 To 16 July 2020', '2020-07-15 06:06:36'),
(3571, 'LMLS-KB-0001', 'Viewed Report From 03 January 2020 To 16 July 2020', '2020-07-15 06:09:24'),
(3572, 'LMLS-KB-0001', 'Viewed Report From 31 January 2020 To 16 July 2020', '2020-07-15 06:12:05'),
(3573, 'LMLS-KB-0001', 'Viewed Report From 31 January 2020 To 16 July 2020', '2020-07-15 06:13:18'),
(3574, 'LMLS-KB-0001', 'Viewed Report From 29 November 2019 To 16 July 2020', '2020-07-15 06:14:30'),
(3575, 'LMLS-KB-0001', 'Viewed Report From 03 January 2020 To 16 July 2020', '2020-07-15 06:20:29'),
(3576, 'LMLS-KB-0001', 'Viewed Report From 03 January 2020 To 16 July 2020', '2020-07-15 06:20:32'),
(3675, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 17:55:22'),
(3677, 'LMLS-KB-0001', 'Logged Out', '2020-07-15 17:55:33'),
(3687, 'LMLS-KB-0001', 'Logged In', '2020-07-15 18:58:31'),
(3689, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:00:32'),
(3690, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:03:43'),
(3691, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:04:54'),
(3692, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:05:45'),
(3693, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:05:52'),
(3694, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:05:55'),
(3695, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:05:56'),
(3696, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:07:24'),
(3697, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:08:28'),
(3698, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:11:25'),
(3700, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:21:42'),
(3701, 'LMLS-KB-0001', 'Viewed Agyakwa Ntow Mireku\'s Report From 15 July 2020 To 16 July 2020', '2020-07-15 19:21:57'),
(3705, 'LMLS-KB-0001', 'Logged Out', '2020-07-15 19:22:24'),
(3707, 'LMLS-KB-0001', 'Logged In', '2020-07-15 22:02:15'),
(3708, 'LMLS-KB-0001', 'Logged In', '2020-07-15 22:21:23'),
(3709, 'LMLS-KB-0001', 'Logged In', '2020-07-15 22:21:33'),
(3710, 'LMLS-KB-0001', 'Logged Out', '2020-07-15 22:21:57'),
(3712, 'LMLS-KB-0001', 'Logged Out', '2020-07-15 22:22:05'),
(3713, 'LMLS-KB-0001', 'Viewed Report From 15 July 2020 To 16 July 2020', '2020-07-15 22:23:59'),
(3714, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:18:30'),
(3715, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:19:26'),
(3716, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:20:10'),
(3717, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:20:44'),
(3718, '1', 'Tried To Create Role \"Front Desk\" But It Already Exists', '2020-07-16 12:20:56'),
(3719, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:21:06'),
(3720, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:21:34'),
(3721, '1', 'Tried To Create Role \"Front Desk\" But It Already Exists', '2020-07-16 12:21:47'),
(3722, '1', 'Tried To Create Role \"Lab Technician\" But It Already Exists', '2020-07-16 12:21:59'),
(3723, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:56:20'),
(3724, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:56:24'),
(3725, '1', 'Tried To Create Role \"Administrator\" But It Already Exists', '2020-07-16 12:57:02'),
(3726, '1', 'Created Role \"Administratorr\"', '2020-07-16 12:57:13'),
(3742, 'LMLS-EL-0000', 'Logged Out', '2020-07-16 22:54:51'),
(3743, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 22:54:57'),
(3744, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 22:57:40'),
(3745, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 22:57:47'),
(3746, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 22:58:32'),
(3747, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 22:58:39'),
(3748, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 23:00:06'),
(3749, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 23:00:11'),
(3750, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 23:03:14'),
(3751, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 23:03:50'),
(3752, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 23:04:06'),
(3753, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 23:04:37'),
(3754, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 23:04:49'),
(3755, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 23:05:18'),
(3756, 'LMLS-AMA-0001', 'Logged Out', '2020-07-16 23:05:54'),
(3757, 'LMLS-AMA-0001', 'Logged In', '2020-07-16 23:05:59'),
(3758, 'LMLS-KB-0001', 'Viewed Receipt For Anot Her Patient', '2020-07-17 13:40:51'),
(4051, 'LMLS-KB-0001', 'Logged In', '2020-07-19 21:36:35'),
(4105, 'LMLS-AMA-0001', 'Viewed Report From 20 July 2020 To 21 July 2020', '2020-07-20 12:02:51'),
(4106, 'LMLS-AMA-0001', 'Viewed Report From 20 July 2020 To 21 July 2020', '2020-07-20 12:04:45'),
(4107, 'LMLS-AMA-0001', 'Viewed Agyakwa Ntow Mireku\'s Report From 20 July 2020 To 21 July 2020', '2020-07-20 12:04:55'),
(4108, 'LMLS-AMA-0001', 'Viewed Maria Nortey\'s Report From 20 July 2020 To 21 July 2020', '2020-07-20 12:05:02'),
(4121, 'LMLS-KB-0001', 'Made Payment Of GHS70 For Bismark Adjei Bediako\'s Request', '2020-07-20 16:29:36'),
(4122, 'LMLS-KB-0001', 'Made Payment Of GHS5 For Bismark Adjei Bediako\'s Request', '2020-07-20 16:30:11'),
(4147, 'LMLS-KB-0001', 'Tried To Add Request For Bismark Adjei Bediako But Patient Had Pending Requests', '2020-07-20 17:15:25'),
(4148, 'LMLS-KB-0001', 'Added Request For Bismark Adjei Bediako', '2020-07-20 17:15:47'),
(4280, 'LMLS-KB-0001', 'Logged In', '2020-07-21 17:28:13'),
(4282, 'LMLS-AMA-0001', 'Logged In', '2020-07-21 18:21:04'),
(4284, 'LMLS-AMA-0001', 'Viewed Report From 21 July 2020 To 22 July 2020', '2020-07-21 18:22:48'),
(4320, 'LMLS-AMA-0001', 'Updated Her Profile', '2020-07-21 22:36:59'),
(4322, 'LMLS-AMA-0001', 'Logged Out', '2020-07-21 22:37:35'),
(4323, 'LMLS-AMA-0001', 'Logged In', '2020-07-21 22:37:41'),
(4324, 'LMLS-AMA-0001', 'Updated Her Profile', '2020-07-21 22:38:47'),
(4331, 'LMLS-AMA-0001', 'Updated Her Profile', '2020-07-21 22:42:20'),
(4357, 'LMLS-KB-0001', 'Updated His Profile', '2020-07-21 22:51:57'),
(4358, 'LMLS-KB-0001', 'Updated His Profile', '2020-07-21 22:52:05'),
(4359, 'LMLS-KB-0001', 'Logged Out', '2020-07-21 22:54:52'),
(4360, 'LMLS-KB-0001', 'Logged In', '2020-07-21 22:54:58'),
(4361, 'LMLS-KB-0001', 'Logged Out', '2020-07-21 22:55:55'),
(4362, 'LMLS-KB-0001', 'Logged In', '2020-07-21 22:56:01'),
(4363, 'LMLS-KB-0001', 'Logged In', '2020-07-22 19:28:02'),
(4364, 'LMLS-KB-0001', 'Logged Out', '2020-07-22 19:29:02'),
(4365, 'LMLS-KB-0001', 'Logged In', '2020-07-22 19:29:09'),
(4371, 'LMLS-AMA-0001', 'Logged In', '2020-07-23 08:43:30'),
(4372, 'LMLS-KB-0001', 'Logged In', '2020-07-23 08:44:01'),
(4373, 'LMLS-KB-0001', 'Logged In', '2020-07-23 08:44:09'),
(4374, 'LMLS-AMA-0001', 'Logged Out', '2020-07-23 08:45:58'),
(4375, 'LMLS-AMA-0001', 'Logged In', '2020-07-23 08:46:01'),
(4379, 'LMLS-AMA-0001', 'Logged Out', '2020-07-23 08:53:28'),
(4380, 'LMLS-AMA-0002', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-23 08:53:32'),
(4381, 'LMLS-AMA-0002', 'Tried To Log In But Failed Because Their Account Is Inactive', '2020-07-23 08:53:38'),
(4382, 'LMLS-AMA-0002', 'Logged In', '2020-07-23 08:53:56'),
(4384, 'LMLS-AMA-0001', 'Logged In', '2020-07-23 09:03:30'),
(4385, 'LMLS-AMA-0001', 'Logged Out', '2020-07-23 09:06:06'),
(4388, 'LMLS-KB-0001', 'Logged In', '2020-07-23 10:11:42'),
(4389, 'LMLS-KB-0001', 'Logged In', '2020-07-23 10:13:30'),
(4390, 'LMLS-AMA-0002', 'Logged In', '2020-07-23 10:13:46'),
(4417, 'LMLS-AMA-0002', 'Added Bue Creatinine eGFR Lab For Steven Arkoh Sackey', '2020-07-24 13:18:06'),
(4445, 'LMLS-AMA-0002', 'Added HBA1C Lab For Steven Arkoh Sackey', '2020-07-25 12:22:53'),
(4446, 'LMLS-AMA-0002', 'Added HBA1C Lab For Steven Arkoh Sackey', '2020-07-25 12:24:41'),
(4450, 'LMLS-AMA-0002', 'Logged In', '2020-07-25 12:39:08'),
(4451, 'LMLS-AMA-0002', 'Logged Out', '2020-07-25 12:39:12'),
(4453, 'LMLS-AMA-0002', 'Added ISE Lab For Steven Arkoh Sackey', '2020-07-25 12:52:34'),
(4454, 'LMLS-AMA-0002', 'Added Iron Study Lab For Steven Arkoh Sackey', '2020-07-25 13:02:24'),
(4455, 'LMLS-AMA-0002', 'Added LFT Lab For Steven Arkoh Sackey', '2020-07-25 13:09:48'),
(4456, 'LMLS-AMA-0002', 'Added Lipid Profile Lab For Steven Arkoh Sackey', '2020-07-25 13:14:08'),
(4457, 'LMLS-AMA-0002', 'Added Protein Electrophoresis Lab For Steven Arkoh Sackey', '2020-07-25 13:34:44'),
(4458, 'LMLS-AMA-0002', 'Added S-C3, SC4 Lab For Steven Arkoh Sackey', '2020-07-25 13:40:27'),
(4459, 'LMLS-AMA-0002', 'Added Serum Lipase Lab For Steven Arkoh Sackey', '2020-07-25 13:46:05'),
(4460, 'LMLS-AMA-0002', 'Added Urine Lab For Steven Arkoh Sackey', '2020-07-25 13:59:13'),
(4461, 'LMLS-AMA-0002', 'Tried To Add Serum Lipase Lab For Steven Arkoh Sackey', '2020-07-25 16:08:47'),
(4462, 'LMLS-AMA-0002', 'Tried To Add Serum Lipase Lab For Steven Arkoh Sackey', '2020-07-25 16:08:55'),
(4463, 'LMLS-AMA-0002', 'Added Urine ACR Lab For Steven Arkoh Sackey', '2020-07-25 16:09:41'),
(4464, 'LMLS-AMA-0002', 'Added Ascitic Fluid C/S Lab For Steven Arkoh Sackey', '2020-07-25 20:28:26'),
(4465, 'LMLS-AMA-0002', 'Added Aspirate C/S Lab For Steven Arkoh Sackey', '2020-07-25 20:34:48'),
(4466, 'LMLS-AMA-0002', 'Added Blood C/S Lab For Steven Arkoh Sackey', '2020-07-25 20:54:00'),
(4467, 'LMLS-AMA-0002', 'Added HVS R/E Lab For Steven Arkoh Sackey', '2020-07-25 21:40:24'),
(4468, 'LMLS-AMA-0002', 'Added Pleural Fluid Lab For Steven Arkoh Sackey', '2020-07-25 23:46:15'),
(4469, 'LMLS-AMA-0002', 'Added Sputum C/S Lab For Steven Arkoh Sackey', '2020-07-26 00:15:56'),
(4470, 'LMLS-AMA-0002', 'Added Sputum AFB Lab For Steven Arkoh Sackey', '2020-07-26 00:21:30'),
(4471, 'LMLS-AMA-0002', 'Added Stool R/E Lab For Steven Arkoh Sackey', '2020-07-26 00:56:09'),
(4472, 'LMLS-AMA-0002', 'Added Urethral C/S Lab For Steven Arkoh Sackey', '2020-07-26 12:33:54'),
(4473, 'LMLS-AMA-0002', 'Added Urine C/S Lab For Steven Arkoh Sackey', '2020-07-26 13:09:57'),
(4474, 'LMLS-AMA-0002', 'Added Wound C/S Lab For Steven Arkoh Sackey', '2020-07-26 13:20:30'),
(4475, 'LMLS-AMA-0002', 'Added Urine R/E Lab For Steven Arkoh Sackey', '2020-07-26 16:18:23'),
(4476, 'LMLS-AMA-0002', 'Added Antenatal Screening Lab For Steven Arkoh Sackey', '2020-07-26 17:00:19'),
(4477, 'LMLS-AMA-0002', 'Added Antenatal Screening Lab For Steven Arkoh Sackey', '2020-07-26 17:00:29'),
(4478, 'LMLS-AMA-0002', 'Added Antenatal Screening Lab For Steven Arkoh Sackey', '2020-07-26 17:01:51'),
(4479, 'LMLS-AMA-0002', 'Added CD4 Count Lab For Steven Arkoh Sackey', '2020-07-26 17:24:05'),
(4480, 'LMLS-AMA-0002', 'Added H. Pylori Ag / SOB Lab For Steven Arkoh Sackey', '2020-07-26 17:42:52'),
(4481, 'LMLS-AMA-0002', 'Added H. Pylori Ag Lab For Steven Arkoh Sackey', '2020-07-26 17:44:06'),
(4482, 'LMLS-AMA-0002', 'Updated H. Pylori Ag. Blood Lab For Steven Arkoh Sackey', '2020-07-26 17:47:11'),
(4483, 'LMLS-AMA-0002', 'Added HBV Viral Load Lab For Steven Arkoh Sackey', '2020-07-26 17:54:19'),
(4484, 'LMLS-AMA-0002', 'Added HIV Viral Load Lab For Steven Arkoh Sackey', '2020-07-26 17:56:40'),
(4485, 'LMLS-AMA-0002', 'Added Hepatitis B Profile Lab For Steven Arkoh Sackey', '2020-07-26 20:48:45'),
(4486, 'LMLS-AMA-0002', 'Added Hepatitis Markers Lab For Steven Arkoh Sackey', '2020-07-26 21:08:21'),
(4487, 'LMLS-AMA-0002', 'Added Mantoux Lab For Steven Arkoh Sackey', '2020-07-26 21:28:00'),
(4488, 'LMLS-AMA-0002', 'Added Pregnancy Test Lab For Steven Arkoh Sackey', '2020-07-26 21:38:09'),
(4489, 'LMLS-AMA-0002', 'Tried To Add Rheumatology Lab For Steven Arkoh Sackey', '2020-07-26 21:47:57'),
(4490, 'LMLS-AMA-0002', 'Added Rheumatology Lab For Steven Arkoh Sackey', '2020-07-26 21:49:56'),
(4491, 'LMLS-AMA-0002', 'Added Semen Analysis Lab For Steven Arkoh Sackey', '2020-07-26 22:14:50'),
(4492, 'LMLS-AMA-0002', 'Added Widal Lab For Steven Arkoh Sackey', '2020-07-26 22:25:43'),
(4493, 'LMLS-AMA-0002', 'Added Blood Film Comment Lab For Steven Arkoh Sackey', '2020-07-26 23:30:28'),
(4494, 'LMLS-AMA-0002', 'Added Clotting Profile Lab For Steven Arkoh Sackey', '2020-07-26 23:41:53'),
(4495, 'LMLS-AMA-0002', 'Added D-Dimers Lab For Steven Arkoh Sackey', '2020-07-26 23:45:36'),
(4496, 'LMLS-AMA-0002', 'Added ESR Lab For Steven Arkoh Sackey', '2020-07-26 23:52:41'),
(4497, 'LMLS-AMA-0002', 'Added NTC SCREENING Lab For Steven Arkoh Sackey', '2020-07-27 00:03:03'),
(4498, 'LMLS-AMA-0002', 'Added SPECIALS Lab For Steven Arkoh Sackey', '2020-07-27 00:09:44'),
(4499, 'LMLS-AMA-0002', 'Tried To Add SPECIALS Lab For Steven Arkoh Sackey', '2020-07-27 00:10:27'),
(4500, 'LMLS-AMA-0002', 'Added SPECIALS Lab For Steven Arkoh Sackey', '2020-07-27 00:10:37'),
(4501, 'LMLS-AMA-0002', 'Added CA 12.5 Lab For Steven Arkoh Sackey', '2020-07-27 00:15:28'),
(4502, 'LMLS-AMA-0002', 'Added CA 15.3 Lab For Steven Arkoh Sackey', '2020-07-27 00:17:40'),
(4503, 'LMLS-AMA-0002', 'Added CA 12.5 Lab For Steven Arkoh Sackey', '2020-07-27 00:19:49'),
(4504, 'LMLS-AMA-0002', 'Added CKMB Lab For Steven Arkoh Sackey', '2020-07-27 00:21:46'),
(4505, 'LMLS-AMA-0002', 'Added CEA Lab For Steven Arkoh Sackey', '2020-07-27 00:22:44'),
(4506, 'LMLS-AMA-0002', 'Added CRP Lab For Steven Arkoh Sackey', '2020-07-27 00:24:28'),
(4507, 'LMLS-AMA-0002', 'Added CRP Ultra Sensitive Lab For Steven Arkoh Sackey', '2020-07-27 00:30:13'),
(4508, 'LMLS-AMA-0002', 'Added M-ALB Lab For Steven Arkoh Sackey', '2020-07-27 00:34:09'),
(4509, 'LMLS-AMA-0002', 'Added B-HCG Serum Lab For Steven Arkoh Sackey', '2020-07-27 00:57:10'),
(4510, 'LMLS-AMA-0002', 'Added FBC 3P Lab For Steven Arkoh Sackey', '2020-07-27 14:24:34'),
(4511, 'LMLS-AMA-0002', 'Added FBC 5P Lab For Steven Arkoh Sackey', '2020-07-27 14:51:24'),
(4512, 'LMLS-KB-0001', 'Logged In', '2020-07-27 20:48:43'),
(4513, 'LMLS-AMA-0002', 'Logged In', '2020-07-27 20:57:21'),
(4521, 'LMLS-AMA-0002', 'Viewed Receipt For Daniella Adwoa Owusua', '2020-07-28 21:25:03'),
(4522, 'LMLS-AMA-0002', 'Viewed Receipt For Daniella Adwoa Owusua', '2020-07-28 21:31:26'),
(4523, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:19:11'),
(4524, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:19:18'),
(4525, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:21:24'),
(4526, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:25:19'),
(4527, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:33:14'),
(4528, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:34:05'),
(4529, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:34:16'),
(4530, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:35:04'),
(4531, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:35:14'),
(4532, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:36:03'),
(4533, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:37:49'),
(4534, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:40:08'),
(4535, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:41:38'),
(4536, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:43:15'),
(4537, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:43:25'),
(4540, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:48:46'),
(4541, 'LMLS-AMA-0002', 'Updated Alpha Feto Protein Lab For Daniella Adwoa Owusua', '2020-07-28 22:49:01'),
(4542, 'LMLS-AMA-0002', 'Viewed Receipt For Daniella Adwoa Owusua', '2020-07-28 22:52:09'),
(4543, 'LMLS-AMA-0002', 'Updated Cortisol Lab For Daniella Adwoa Owusua', '2020-07-28 23:24:54'),
(4544, 'LMLS-AMA-0002', 'Updated Cortisol Lab For Daniella Adwoa Owusua', '2020-07-28 23:26:17'),
(4545, 'LMLS-AMA-0002', 'Updated Hormonal Assay Lab For Trial Ntow Adjei Laryea', '2020-07-28 23:54:34'),
(4546, 'LMLS-AMA-0002', 'Updated Hormonal Assay Lab For Trial Ntow Adjei Laryea', '2020-07-28 23:57:03'),
(4547, 'LMLS-AMA-0002', 'Updated PSA Lab For Daniella Adwoa Owusua', '2020-07-29 00:25:41'),
(4548, 'LMLS-AMA-0002', 'Updated Estrogen Lab For Daniella Adwoa Owusua', '2020-07-29 00:26:14'),
(4549, 'LMLS-AMA-0002', 'Updated Estrogen Lab For Daniella Adwoa Owusua', '2020-07-29 00:26:41'),
(4550, 'LMLS-AMA-0002', 'Updated Estrogen Lab For Daniella Adwoa Owusua', '2020-07-29 00:27:25'),
(4551, 'LMLS-AMA-0002', 'Updated Cortisol Lab For Maria Nortey', '2020-07-29 00:27:54'),
(4552, 'LMLS-AMA-0002', 'Updated PSA Lab For Maria Nortey', '2020-07-29 00:28:26'),
(4553, 'LMLS-AMA-0002', 'Updated PTH Lab For Maria Nortey', '2020-07-29 00:36:13'),
(4554, 'LMLS-AMA-0002', 'Updated PTH Lab For Maria Nortey', '2020-07-29 00:36:27'),
(4555, 'LMLS-AMA-0002', 'Updated His Profile', '2020-07-29 10:22:40'),
(4556, 'LMLS-AMA-0002', 'Updated His Profile', '2020-07-29 10:22:49'),
(4557, 'LMLS-AMA-0002', 'Updated BUE Creatinine Lab For Daniella Adwoa Owusua', '2020-07-29 15:38:59'),
(4558, 'LMLS-AMA-0002', 'Updated Bue Creatinine eGFR Lab For Daniella Adwoa Owusua', '2020-07-29 15:47:53'),
(4559, 'LMLS-AMA-0002', 'Updated BUE Lipids Lab For Michelle Ntow Adjei Laryea', '2020-07-29 16:25:51'),
(4560, 'LMLS-AMA-0002', 'Updated BUE Lipids Lab For Daniella Adwoa Owusua', '2020-07-29 16:26:54'),
(4561, 'LMLS-AMA-0002', 'Added BUE LFT Lab For Michelle Ntow Adjei Laryea', '2020-07-29 16:27:38'),
(4562, 'LMLS-AMA-0002', 'Updated CSF Biochem Lab For Michelle Ntow Adjei Laryea', '2020-07-29 16:51:37'),
(4563, 'LMLS-AMA-0002', 'Updated Calcium Profile Lab For Michelle Ntow Adjei Laryea', '2020-07-29 17:05:05'),
(4564, 'LMLS-AMA-0002', 'Updated Cardiac Enzyme Lab For Michelle Ntow Adjei Laryea', '2020-07-29 17:18:29'),
(4565, 'LMLS-AMA-0002', 'Updated Compact Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:33:50'),
(4566, 'LMLS-AMA-0002', 'Updated Folate/B12 Lab For Daniella Adwoa Owusua', '2020-07-29 17:40:35'),
(4567, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Michelle Ntow Adjei Laryea', '2020-07-29 17:55:49'),
(4568, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:56:49'),
(4569, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:57:46'),
(4570, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:57:59'),
(4571, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:58:51'),
(4572, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:59:03'),
(4573, 'LMLS-AMA-0002', 'Updated General Chemistry Lab For Daniella Adwoa Owusua', '2020-07-29 17:59:18'),
(4574, 'LMLS-AMA-0002', 'Updated HBA1C Lab For Steven Arkoh Sackey', '2020-07-29 18:07:59'),
(4575, 'LMLS-AMA-0002', 'Updated Hypersensitive CPR Lab For Michelle Ntow Adjei Laryea', '2020-07-29 18:13:29'),
(4576, 'LMLS-AMA-0002', 'Updated ISE Lab For Steven Arkoh Sackey', '2020-07-29 18:19:39'),
(4577, 'LMLS-AMA-0002', 'Updated ISE Lab For Michelle Ntow Adjei Laryea', '2020-07-29 18:20:46'),
(4578, 'LMLS-AMA-0002', 'Updated Iron Study Lab For Steven Arkoh Sackey', '2020-07-29 18:35:12'),
(4579, 'LMLS-AMA-0002', 'Updated Iron Study Lab For Michelle Ntow Adjei Laryea', '2020-07-29 18:35:28'),
(4581, 'LMLS-AMA-0002', 'Logged In', '2020-07-29 20:00:50'),
(4582, 'LMLS-AMA-0002', 'Updated LFT Lab For Steven Arkoh Sackey', '2020-07-29 20:58:11'),
(4583, 'LMLS-AMA-0002', 'Updated Lipid Profile Lab For Steven Arkoh Sackey', '2020-07-29 21:05:09'),
(4584, 'LMLS-AMA-0002', 'Updated Lipid Profile Lab For Michelle Ntow Adjei Laryea', '2020-07-29 21:05:29'),
(4585, 'LMLS-AMA-0002', 'Updated Protein Electrophoresis Lab For Steven Arkoh Sackey', '2020-07-29 21:19:01'),
(4586, 'LMLS-AMA-0002', 'Updated Protein Electrophoresis Lab For Steven Arkoh Sackey', '2020-07-29 21:19:11'),
(4587, 'LMLS-AMA-0002', 'Updated Protein Electrophoresis Lab For Steven Arkoh Sackey', '2020-07-29 21:20:39'),
(4588, 'LMLS-AMA-0002', 'Updated Protein Electrophoresis Lab For Michelle Ntow Adjei Laryea', '2020-07-29 21:22:11'),
(4589, 'LMLS-AMA-0002', 'Updated S-C3, SC4 Lab For Michelle Ntow Adjei Laryea', '2020-07-29 21:28:54'),
(4590, 'LMLS-AMA-0002', 'Updated Serum Lipase Lab For Michelle Ntow Adjei Laryea', '2020-07-29 21:33:53'),
(4591, 'LMLS-AMA-0002', 'Updated Urine Lab For Steven Arkoh Sackey', '2020-07-29 21:45:42'),
(4592, 'LMLS-AMA-0002', 'Updated Urine ACR Lab For Steven Arkoh Sackey', '2020-07-29 21:54:53'),
(4593, 'LMLS-AMA-0002', 'Logged In', '2020-07-30 09:32:19'),
(4594, 'LMLS-AMA-0002', 'Logged In', '2020-07-30 09:32:54'),
(4595, 'LMLS-AMA-0002', 'Logged Out', '2020-07-30 09:33:07'),
(4598, 'LMLS-AMA-0002', 'Updated His Profile', '2020-07-30 11:15:38'),
(4599, 'LMLS-AMA-0002', 'Updated His Profile', '2020-07-30 12:06:00'),
(4600, 'LMLS-AMA-0002', 'Updated Aspirate C/S Lab For Steven Arkoh Sackey', '2020-07-30 12:37:52'),
(4601, 'LMLS-AMA-0002', 'Updated Aspirate C/S Lab For Steven Arkoh Sackey', '2020-07-30 12:38:21'),
(4602, 'LMLS-AMA-0002', 'Updated Aspirate C/S Lab For Steven Arkoh Sackey', '2020-07-30 12:43:49'),
(4603, 'LMLS-AMA-0002', 'Updated Blood C/S Lab For Steven Arkoh Sackey', '2020-07-30 13:39:24'),
(4604, 'LMLS-AMA-0002', 'Updated Blood C/S Lab For Steven Arkoh Sackey', '2020-07-30 13:40:41'),
(4605, 'LMLS-AMA-0002', 'Updated Blood C/S Lab For Maria Nortey', '2020-07-30 13:55:45'),
(4606, 'LMLS-AMA-0002', 'Updated Blood C/S Lab For Steven Arkoh Sackey', '2020-07-30 13:56:10'),
(4607, 'LMLS-AMA-0002', 'Updated Blood C/S Lab For Maria Nortey', '2020-07-30 15:54:40'),
(4608, 'LMLS-AMA-0002', 'Updated Ear Swab C/S Lab For Maria Nortey', '2020-07-30 15:57:01'),
(4609, 'LMLS-AMA-0002', 'Updated Eye Swab C/S Lab For Maria Nortey', '2020-07-30 15:58:58'),
(4610, 'LMLS-AMA-0002', 'Updated Endocervical Swab C/S Lab For Maria Nortey', '2020-07-30 21:05:21'),
(4611, 'LMLS-AMA-0002', 'Updated HVS C/S Lab For Maria Nortey', '2020-07-30 21:07:25'),
(4612, 'LMLS-AMA-0002', 'Updated HVS R/E Lab For Steven Arkoh Sackey', '2020-07-30 21:28:20'),
(4613, 'LMLS-AMA-0002', 'Updated Pleural Fluid Lab For Maria Nortey', '2020-07-30 22:32:27'),
(4614, 'LMLS-AMA-0002', 'Updated Pleural Fluid Lab For Maria Nortey', '2020-07-30 22:37:01'),
(4616, 'LMLS-AMA-0002', 'Updated Pus Fluid Lab For Maria Nortey', '2020-07-30 23:03:01'),
(4617, 'LMLS-AMA-0002', 'Updated Semen C/S Lab For Maria Nortey', '2020-07-30 23:07:46'),
(4618, 'LMLS-AMA-0002', 'Updated Semen C/S Lab For Steven Arkoh Sackey', '2020-07-30 23:09:44'),
(4619, 'LMLS-AMA-0002', 'Updated Semen C/S Lab For Maria Nortey', '2020-07-30 23:09:58'),
(4620, 'LMLS-AMA-0002', 'Updated Semen C/S Lab For Maria Nortey', '2020-07-30 23:12:07'),
(4621, 'LMLS-AMA-0002', 'Updated Skin Snip Lab For Maria Nortey', '2020-07-30 23:25:07'),
(4622, 'LMLS-AMA-0002', 'Updated Sputum C/S Lab For Steven Arkoh Sackey', '2020-07-30 23:37:51'),
(4623, 'LMLS-AMA-0002', 'Updated Sputum AFB Lab For Steven Arkoh Sackey', '2020-07-31 12:07:28'),
(4624, 'LMLS-AMA-0002', 'Updated Stool C/S Lab For Michelle Ntow Adjei Laryea', '2020-07-31 12:12:06'),
(4625, 'LMLS-AMA-0002', 'Updated Stool R/E Lab For Steven Arkoh Sackey', '2020-07-31 15:11:39'),
(4626, 'LMLS-AMA-0002', 'Updated Stool R/E Lab For Steven Arkoh Sackey', '2020-07-31 15:11:46'),
(4628, 'LMLS-AMA-0002', 'Updated Stool R/E Lab For Bismark Adjei Bediako', '2020-07-31 15:18:09'),
(4629, 'LMLS-AMA-0002', 'Updated Stool R/E Lab For Bismark Adjei Bediako', '2020-07-31 15:19:21'),
(4630, 'LMLS-AMA-0002', 'Added Throat Swab C/S Lab For Michelle Ntow Adjei Laryea', '2020-07-31 15:29:33'),
(4631, 'LMLS-AMA-0002', 'Added Throat Swab C/S Lab For Michelle Ntow Adjei Laryea', '2020-07-31 15:29:51'),
(4632, 'LMLS-AMA-0002', 'Updated Urethral C/S Lab For Michelle Ntow Adjei Laryea', '2020-07-31 15:37:14'),
(4633, 'LMLS-AMA-0002', 'Updated Urethral C/S Lab For Michelle Ntow Adjei Laryea', '2020-07-31 15:39:15'),
(4634, 'LMLS-AMA-0002', 'Updated Wound C/S Lab For Steven Arkoh Sackey', '2020-07-31 16:10:47'),
(4635, 'LMLS-AMA-0002', 'Logged In', '2020-07-31 19:08:01'),
(4639, 'LMLS-AMA-0002', 'Updated Antenatal Screening Lab For Steven Arkoh Sackey', '2020-07-31 19:23:03'),
(4640, 'LMLS-AMA-0002', 'Updated Antenatal Screening Lab For Steven Arkoh Sackey', '2020-07-31 19:25:08'),
(4641, 'LMLS-AMA-0002', 'Updated Antenatal Screening Lab For Steven Arkoh Sackey', '2020-07-31 19:25:20'),
(4642, 'LMLS-AMA-0002', 'Updated CD4 Count Lab For Steven Arkoh Sackey', '2020-07-31 22:55:04'),
(4643, 'LMLS-AMA-0002', 'Updated H. Pylori Ag Lab For Steven Arkoh Sackey', '2020-07-31 23:09:27'),
(4644, 'LMLS-AMA-0002', 'Updated H. Pylori Ag / SOB Lab For Steven Arkoh Sackey', '2020-07-31 23:11:06'),
(4645, 'LMLS-AMA-0002', 'Updated H. Pylori Ag / SOB Lab For Steven Arkoh Sackey', '2020-07-31 23:12:01'),
(4646, 'LMLS-AMA-0002', 'Added H. Pylori Ag. Blood Lab For Steven Arkoh Sackey', '2020-07-31 23:12:29'),
(4647, 'LMLS-AMA-0002', 'Updated HBV Viral Load Lab For Steven Arkoh Sackey', '2020-07-31 23:22:13'),
(4648, 'LMLS-AMA-0002', 'Updated HIV Viral Load Lab For Steven Arkoh Sackey', '2020-07-31 23:22:35'),
(4649, 'LMLS-AMA-0002', 'Updated Hepatitis B Profile Lab For Steven Arkoh Sackey', '2020-07-31 23:32:06'),
(4650, 'LMLS-AMA-0002', 'Updated Pregnancy Test Lab For Steven Arkoh Sackey', '2020-08-01 00:02:24'),
(4651, 'LMLS-AMA-0002', 'Updated Pregnancy Test Lab For Michelle Ntow Adjei Laryea', '2020-08-01 00:02:53'),
(4652, 'LMLS-AMA-0002', 'Updated Rheumatology Lab For Michelle Ntow Adjei Laryea', '2020-08-01 00:14:00'),
(4653, 'LMLS-AMA-0002', 'Added FBC CHILDREN Lab For Agyakwa Ntow Mireku', '2020-08-01 11:13:34'),
(4654, 'LMLS-AMA-0002', 'Added FBC CHILDREN Lab For Agyakwa Ntow Mireku', '2020-08-01 11:13:47'),
(4655, 'LMLS-AMA-0002', 'Added FBC CHILDREN Lab For Agyakwa Ntow Mireku', '2020-08-01 11:15:03'),
(4656, 'LMLS-AMA-0002', 'Added FBC CHILDREN Lab For Agyakwa Ntow Mireku', '2020-08-01 11:17:30'),
(4657, 'LMLS-AMA-0002', 'Updated FBC CHILDREN Lab For Agyakwa Ntow Mireku', '2020-08-01 11:18:11'),
(4658, 'LMLS-AMA-0002', 'Updated FBC 3P Lab For Steven Arkoh Sackey', '2020-08-01 11:30:23'),
(4659, 'LMLS-AMA-0002', 'Updated FBC 3P Lab For Steven Arkoh Sackey', '2020-08-01 11:31:23'),
(4660, 'LMLS-AMA-0002', 'Updated FBC 5P Lab For Agyakwa Ntow Mireku', '2020-08-01 11:33:19'),
(4661, 'LMLS-AMA-0002', 'Updated Clotting Profile Lab For Steven Arkoh Sackey', '2020-08-01 11:49:25'),
(4662, 'LMLS-AMA-0002', 'Added D-Dimers Lab For Steven Arkoh Sackey', '2020-08-01 11:53:06'),
(4663, 'LMLS-AMA-0002', 'Updated ESR Lab For Steven Arkoh Sackey', '2020-08-01 11:55:01'),
(4664, 'LMLS-AMA-0002', 'Updated SPECIALS Lab For Steven Arkoh Sackey', '2020-08-01 12:08:16'),
(4665, 'LMLS-AMA-0002', 'Updated CA 12.5 Lab For Steven Arkoh Sackey', '2020-08-01 12:14:10'),
(4666, 'LMLS-AMA-0002', 'Updated CA 15.3 Lab For Maria Nortey', '2020-08-01 12:14:30'),
(4667, 'LMLS-AMA-0002', 'Updated CEA Lab For Maria Nortey', '2020-08-01 12:17:41'),
(4668, 'LMLS-AMA-0002', 'Updated CKMB Lab For Maria Nortey', '2020-08-01 12:17:59'),
(4669, 'LMLS-AMA-0002', 'Updated CRP Lab For Maria Nortey', '2020-08-01 12:22:39'),
(4670, 'LMLS-AMA-0002', 'Updated CRP Ultra Sensitive Lab For Maria Nortey', '2020-08-01 12:23:08'),
(4671, 'LMLS-AMA-0002', 'Added M-ALB Lab For Maria Nortey', '2020-08-01 12:28:05'),
(4672, 'LMLS-AMA-0002', 'Updated B-HCG Serum Lab For Maria Nortey', '2020-08-01 12:29:02'),
(4673, 'LMLS-AMA-0002', 'Updated B-HCG Serum Lab For Maria Nortey', '2020-08-01 12:31:58'),
(4674, 'LMLS-AMA-0002', 'Logged Out', '2020-08-01 12:34:48'),
(4675, 'LMLS-AMA-0001', 'Logged In', '2020-08-01 12:34:54'),
(4676, 'LMLS-AMA-0001', 'Logged Out', '2020-08-01 12:35:18'),
(4677, 'LMLS-AMA-0002', 'Logged In', '2020-08-01 12:35:22'),
(4678, 'LMLS-AMA-0002', 'Logged Out', '2020-08-01 12:35:38'),
(4682, 'LMLS-KB-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-08-01 12:42:53'),
(4683, 'LMLS-KB-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-08-01 12:42:55'),
(4684, 'LMLS-KB-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-08-01 12:42:57'),
(4685, 'LMLS-KB-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-08-01 12:42:58'),
(4686, 'LMLS-KB-0001', 'Logged In', '2020-08-01 14:55:12'),
(4687, 'LMLS-KB-0001', 'Logged Out', '2020-08-01 14:55:19'),
(4688, 'LMLS-AMA-0002', 'Logged In', '2020-08-01 17:42:07'),
(4689, 'LMLS-AMA-0002', 'Viewed Report From 01 August 2020 To 02 August 2020', '2020-08-01 17:45:07'),
(4690, 'LMLS-AMA-0002', 'Logged Out', '2020-08-01 17:45:24'),
(4693, 'LMLS-AMA-0002', 'Logged In', '2020-08-01 17:46:07'),
(4694, 'LMLS-AMA-0002', 'Logged Out', '2020-08-01 17:46:14'),
(4695, 'LMLS-AMA-0002', 'Logged In', '2020-08-01 17:46:20'),
(4696, 'LMLS-AMA-0002', 'Logged Out', '2020-08-01 17:46:28'),
(4719, 'LMLS-AMA-0001', 'Logged In', '2020-08-01 21:07:52'),
(4720, 'LMLS-AMA-0001', 'Logged Out', '2020-08-01 21:08:02'),
(4730, 'LMLS-0000', 'Logged In', '2020-08-02 02:27:01'),
(4731, 'LMLS-0000', 'Logged Out', '2020-08-02 02:36:39'),
(4732, 'LMLS-AMA-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-08-02 17:18:19'),
(4733, 'LMLS-AMA-0001', 'Logged In', '2020-08-02 17:18:24'),
(4734, 'LMLS-AMA-0001', 'Logged Out', '2020-08-02 17:18:30'),
(4735, 'LMLS-AMA-0001', 'Tried To Log In But Failed Because They Provided Wrong Password', '2020-08-02 17:21:25'),
(4736, 'LMLS-AMA-0001', 'Logged In', '2020-08-02 17:21:30'),
(4737, 'LMLS-AMA-0001', 'Logged Out', '2020-08-02 17:21:45'),
(4738, 'LMLS-0000', 'Logged In', '2020-08-02 18:06:46'),
(4739, 'LMLS-0000', 'Viewed Report From 02 August 2020 To 03 August 2020', '2020-08-02 18:20:06'),
(4740, 'LMLS-0000', 'Viewed Receipt For Daniella Adwoa Owusua', '2020-08-02 18:30:38'),
(4741, 'LMLS-0000', 'Logged Out', '2020-08-02 18:32:20'),
(4742, 'LMLS-0000', 'Logged In', '2020-08-05 19:02:16'),
(4743, 'LMLS-0000', 'Viewed Report From 05 August 2020 To 06 August 2020', '2020-08-05 19:04:38'),
(4744, 'LMLS-0000', 'Logged Out', '2020-08-05 19:04:53'),
(4745, 'LMLS-0000', 'Logged In', '2020-08-11 22:14:38'),
(4746, 'LMLS-0000', 'Logged Out', '2020-08-11 23:01:28'),
(4747, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:16:47'),
(4748, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:16:59'),
(4749, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Bismark Bediako', '2020-08-22 13:17:01'),
(4750, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:17:12'),
(4751, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Bismark Bediako', '2020-08-22 13:17:33'),
(4752, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Bismark Bediako', '2020-08-22 13:17:36'),
(4753, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:20:34'),
(4754, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:20:36'),
(4755, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:20:37'),
(4756, 'user_id', 'Blocked name', '2020-08-22 13:22:08'),
(4757, 'user_id', 'Blocked name', '2020-08-22 13:22:25'),
(4758, 'user_id', 'Blocked bismark', '2020-08-22 13:22:40'),
(4759, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Tried To Block Ben Sabah', '2020-08-22 13:32:33'),
(4760, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Tried To Block Ben Sabah', '2020-08-22 13:32:44'),
(4761, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:34:38'),
(4762, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:34:43'),
(4763, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Bismark Bediako', '2020-08-22 13:34:46'),
(4764, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Blocked Ben Sabah', '2020-08-22 13:35:01'),
(4765, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Logged In', '2020-08-22 18:01:23'),
(4766, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Logged In', '2020-08-22 18:45:01'),
(4767, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Updated \"Golden Rim\" To Categories', '2020-08-22 18:48:05');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` varchar(50) NOT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `email_address` varchar(50) NOT NULL,
  `phone_number` char(10) NOT NULL,
  `phone_number_two` char(10) DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `customer_id`, `name`, `email_address`, `phone_number`, `phone_number_two`, `date`, `time`, `date_added`) VALUES
('HOvjq9s7-w5pdqAeE0-1597767392-n9qUt9au-fE0qsbWN', '', 'Shirley Mensah', 'shirley@mensah.com.gh', '0551212120', '', '2020-09-06', '18:19:00', '2020-08-18 16:16:32'),
('yQZNo056-mk69txv3g-1597767113-XsnK9daX-eP6UyBcS', 'Q6j7ylin-v2wgbq4pi-1597689254-fqhxksg3-i4gfqcp3', 'Bismark Bediako', 'bismark@bediako.com.gh', '0231122334', '', '2020-08-25', '16:07:00', '2020-08-18 16:11:53');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `price` double(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `customer_id`, `product_id`, `price`, `quantity`, `date_added`) VALUES
('06uYvgPn-wxzDTvkqu-1597916151-nmB3Q0Xd-KhTVgjhT', 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', '1', 0.00, 1, '2020-08-20 09:35:51'),
('bNyeBLt8-0b4EYqAGs-1597915780-04AToZ4q-5Jax6hGt', 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', '1', 0.00, 1, '2020-08-20 09:29:40'),
('q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', 20.00, 1, '2020-08-17 21:18:51'),
('R8f4V0fb-tKxwR5g7t-1597913777-vcLZkE2Y-NufxGzjx', 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', '1', 0.00, 1, '2020-08-20 08:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
('M0H5InS6-zCeL2NL6I-1598035679-WPFvMlxN-OV3NelDd', 'Golden Rim', 'Has Golden Rim :)'),
('yhpn9FBJ-ZRkNS9tWe-1598035738-hqz9C3kf-VAlWeb8f', 'Golden Rim 2', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(14) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email_address` varchar(50) NOT NULL,
  `phone_number` char(10) DEFAULT NULL,
  `phone_number_two` char(10) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'Active',
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `activation_code` varchar(15) DEFAULT NULL,
  `reset_code` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_id`, `first_name`, `last_name`, `email_address`, `phone_number`, `phone_number_two`, `address`, `city`, `district`, `region`, `password`, `status`, `created_on`, `activation_code`, `reset_code`) VALUES
(1, 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', 'Bismark', 'Bediako', 'bismark@bediako.com.gh', '0231122334', '0231232123', 'Anyaa Palas Town', 'Active', 'Ablekuma North', 'Greater Accra', '$2y$11$TtRPkTljTNcj6vlIzBkMRuPVByqGJCtbfP9fijtq91AfR1NRQcZFu', 'Active', '2020-08-17 18:34:14', NULL, '6Uj9p6IGLaNI'),
(3, 'uMmgYsmC-1v3jP0Lk0-1598120079-4mX3UFW6-bP7grGqD', 'Ben', 'Sabah', 'ben@sabah.com.gh', NULL, NULL, NULL, NULL, NULL, NULL, '$2y$11$GQDzv6Q5Its0/0ZLBhDLIelK8CacBpcQfWrFeMm0Dfu3YU2f/ECtW', 'Active', '2020-08-22 18:14:39', NULL, 'hnAaHDWP40nq');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `price` double(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` double(10,2) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(10) NOT NULL DEFAULT 'Pending',
  `confirmation_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(14) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `category_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `quantity` int(14) NOT NULL,
  `interior_width` double(10,2) NOT NULL,
  `interior_height` double(10,2) NOT NULL,
  `exterior_width` double(10,2) NOT NULL,
  `exterior_height` double(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_id`, `category_id`, `name`, `description`, `price`, `quantity`, `interior_width`, `interior_height`, `exterior_width`, `exterior_height`, `image`, `date_added`) VALUES
(1, '1WAhCUbj-Wg2xRE97n-1598095746-OGNoQi32-zkMEfXG9', 'M0H5InS6-zCeL2NL6I-1598035679-WPFvMlxN-OV3NelDd', 'Beautiful Nice Frame', 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco', 12, 1222, 11.00, 11.00, 12.00, 12.00, 'pictures/products/beautiful_nice_frame.jpg', '2020-08-22 11:29:06');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(14) NOT NULL,
  `name` varchar(255) NOT NULL,
  `permissions` text NOT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `permissions`, `status`) VALUES
(1, 'Administrator', 'Can Create Product, Can Edit Product, Can View Product, Can View Products, Can View Order, Can View Orders, Can Create Category, Can Edit Category, Can View Category, Can View Categories, Can Block Customer, Can Unblock Customer, Can View Customer, Can View Customers, Can Create User, Can Edit User, Can View User, Can View Users, Can Block User, Can Unblock User, Can Create Reports', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `testimonies`
--

CREATE TABLE `testimonies` (
  `id` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `testimony` text NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'Front',
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testimonies`
--

INSERT INTO `testimonies` (`id`, `customer_id`, `testimony`, `type`, `date`) VALUES
('DoTe6VkI-0oUzMs0Zb-1598028985-0bIuVsdX-tuhsmzt3', 'uMmgYsmC-1v3jP0Lk0-1598120079-4mX3UFW6-bP7grGqD', 'Great Selection Of Products. Really Lovely. Keep It Up Guys....', 'Front', '2020-08-21 16:56:25'),
('S2KAgRYD-lJAH085qg-1597926545-EdBPgk8j-4NYJFgy5', 'q6J7ylIN-v2WGBQ4PI-1597689254-fqhxkSG3-I4GfQcP3', 'Some Random Testimony', 'Front', '2020-08-20 12:29:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(14) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email_address` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` int(13) NOT NULL,
  `status` varchar(7) NOT NULL DEFAULT 'Active',
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `reset_code` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `first_name`, `last_name`, `email_address`, `username`, `password`, `role`, `status`, `created_on`, `reset_code`) VALUES
(1, 'dGgv4t6T-TCfZB3Bky-1597761845-VIuKDUhk-By5gytjw', 'Kofi', 'Esquire', 'kofi@esquire.com', 'esquire', '$2y$11$TtRPkTljTNcj6vlIzBkMRuPVByqGJCtbfP9fijtq91AfR1NRQcZFu', 1, 'Active', '2020-08-18 14:46:10', 'Nhbg65Trfd');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `product_id` varchar(20) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_trail`
--
ALTER TABLE `audit_trail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonies`
--
ALTER TABLE `testimonies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_trail`
--
ALTER TABLE `audit_trail`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4768;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
