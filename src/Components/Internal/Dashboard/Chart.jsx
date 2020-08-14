import React from 'react';
import Card from '@material-ui/core/Card';
import { Line } from 'react-chartjs-2';

function Chart({ stats }) {
    const data = {
        labels: [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
        ],
        datasets: [
            {
                label: 'Alpha Feto Protein',
                data : stats.alpha_feto,
                borderColor: ['rgba(255, 200, 100, .7)'],
                backgroundColor: ['rgba(255, 200, 100, .7)'],
            },
            {
                label: 'Antenatal Screening',
                data : stats.antenatal_screening,
                borderColor: ['rgba(200, 100, 150, .7)'],
                backgroundColor: ['rgba(200, 100, 150, .7)'],
            },
            {
                label: 'Ascitic Fluid',
                data : stats.ascitic_fluid_cs,
                borderColor: ['#9c7a97'],
                backgroundColor: ['#9c7a97'],
            },
            {
                label: 'Aspirate C/S',
                data : stats.aspirate_cs,
                borderColor: ['#00a7e1'],
                backgroundColor: ['#00a7e1'],
            },
            {
                label: 'Blood C/S',
                data : stats.blood_cs,
                borderColor: ['#eddea4'],
                backgroundColor: ['#eddea4'],
            },
            {
                label: 'Blood Film Component',
                data : stats.blood_film_comment,
                borderColor: ['#42f2f7'],
                backgroundColor: ['#42f2f7'],
            },
            {
                label: 'Blood Sugar',
                data : stats.blood_sugar,
                borderColor: ['#ff9b42'],
                backgroundColor: ['#ff9b42'],
            },
            {
                label: 'BUE Creatinine',
                data : stats.bue_creatinine,
                borderColor: ['#4d4730'],
                backgroundColor: ['#4d4730'],
            },
            {
                label: 'BUE Creatinine eGFR',
                data : stats.bue_creatinine_egfr,
                borderColor: ['#ffe6e8'],
                backgroundColor: ['#ffe6e8'],
            },
            {
                label: 'BUE Creatinine LFT',
                data : stats.bue_creatinine_lft,
                borderColor: ['#888da7'],
                backgroundColor: ['#888da7'],
            },
            {
                label: 'BUE Creatinine Lipids',
                data : stats.bue_creatinine_lipids,
                borderColor: ['#515a47'],
                backgroundColor: ['#515a47'],
            },
            {
                label: 'C-Reactive Protein',
                data : stats.c_reactive_protein,
                borderColor: ['#ff000'],
                backgroundColor: ['#ff000'],
            },
            {
                label: 'CA 125',
                data : stats.ca_one_two_five,
                borderColor: ['#ff8200'],
                backgroundColor: ['#ff8200'],
            },
            {
                label: 'CA 153',
                data : stats.ca_one_five_three,
                borderColor: ['#0a0903'],
                backgroundColor: ['#0a0903'],
            },
            {
                label: 'Calcium Profile',
                data : stats.calcium_profile,
                borderColor: ['#c52233'],
                backgroundColor: ['#c52233'],
            },
            {
                label: 'Cardiac Enzyme',
                data : stats.cardiac_enzyme,
                borderColor: ['#7a4419'],
                backgroundColor: ['#7a4419'],
            },
            {
                label: 'CD4 Count',
                data : stats.cd4_count,
                borderColor: ['#9c6615'],
                backgroundColor: ['#9c6615'],
            },
            {
                label: 'CEA',
                data : stats.cea,
                borderColor: ['#a51c30'],
                backgroundColor: ['#a51c30'],
            },
            {
                label: 'CKMB',
                data : stats.ckmb,
                borderColor: ['#7ea2aa'],
                backgroundColor: ['#7ea2aa'],
            },
            {
                label: 'Clotting Profile',
                data : stats.clotting_profile,
                borderColor: ['#cdd1de'],
                backgroundColor: ['#cdd1de'],
            },
            {
                label: 'Compact Chemistry',
                data : stats.compact_chemistry,
                borderColor: ['#580c1f'],
                backgroundColor: ['#580c1f'],
            },
            {
                label: 'Cortisol',
                data : stats.cortisol,
                borderColor: ['#400406'],
                backgroundColor: ['#400406'],
            },
            {
                label: 'CRP',
                data : stats.crp,
                borderColor: ['#a480cf'],
                backgroundColor: ['#a480cf'],
            },
            {
                label: 'CRP Ultra Sensitive',
                data : stats.crp_ultra_sensitive,
                borderColor: ['#49b6ff'],
                backgroundColor: ['#49b6ff'],
            },
            {
                label: 'CSF Biochem',
                data : stats.csf_biochem,
                borderColor: ['#8be8cb'],
                backgroundColor: ['#8be8cb'],
            },
            {
                label: 'D Dimers',
                data : stats.d_dimers,
                borderColor: ['#725752'],
                backgroundColor: ['#725752'],
            },
            {
                label: 'Ear Sawb C/S',
                data : stats.ear_swab_cs,
                borderColor: ['#96c0b7'],
                backgroundColor: ['#96c0b7'],
            },
            {
                label: 'Endocervical Sawb C/S',
                data : stats.endocervical_swab_cs,
                borderColor: ['#adfc92'],
                backgroundColor: ['#adfc92'],
            },
            {
                label: 'ESR',
                data : stats.esr,
                borderColor: ['#413620'],
                backgroundColor: ['#413620'],
            },
            {
                label: 'Estrogen',
                data : stats.estrogen,
                borderColor: ['#fef6c9'],
                backgroundColor: ['#fef6c9'],
            },
            {
                label: 'Eye Sawb C/S',
                data : stats.eye_swab_cs,
                borderColor: ['#e4ff1a'],
                backgroundColor: ['#e4ff1a'],
            },
            {
                label: 'FBC 3P',
                data : stats.fbc_3p,
                borderColor: ['#4a0d67'],
                backgroundColor: ['#4a0d67'],
            },
            {
                label: 'FBC 5P',
                data : stats.fbc_5p,
                borderColor: ['#1a8fe3'],
                backgroundColor: ['#1a8fe3'],
            },
            {
                label: 'FBC Children',
                data : stats.fbc_children,
                borderColor: ['#ff5714'],
                backgroundColor: ['#ff5714'],
            },
            {
                label: 'Folate B12',
                data : stats.folate_b12,
                borderColor: ['#6f58c9'],
                backgroundColor: ['#6f58c9'],
            },
            {
                label: 'General Chemistry',
                data : stats.general_chemistry,
                borderColor: ['#bbdbd1'],
                backgroundColor: ['#bbdbd1'],
            },
            {
                label: 'H. Pylori Ag.',
                data : stats.h_pylori_ag,
                borderColor: ['#310a31'],
                backgroundColor: ['#310a31'],
            },
            {
                label: 'H. Pylori Ag. Blood',
                data : stats.h_pylori_ag_bloob,
                borderColor: ['#355691'],
                backgroundColor: ['#355691'],
            },
            {
                label: 'H. Pylori Ag. SOB',
                data : stats.h_pylori_ag_sob,
                borderColor: ['#dc6bad'],
                backgroundColor: ['#dc6bad'],
            },
            {
                label: 'NBA1C',
                data : stats.hba1c,
                borderColor: ['#e6c229'],
                backgroundColor: ['#e6c229'],
            },
            {
                label: 'HBV Viral Load',
                data : stats.hbv_viral_load,
                borderColor: ['#a7cab1'],
                backgroundColor: ['#a7cab1'],
            },
            {
                label: 'Hepatitis B Profile',
                data : stats.hepatitis_b_profile,
                borderColor: ['#8c7aa9'],
                backgroundColor: ['#8c7aa9'],
            },
            {
                label: 'Hepatitis Markers',
                data : stats.hepatitis_markers,
                borderColor: ['#5f5aa2'],
                backgroundColor: ['#5f5aa2'],
            },
            {
                label: 'HIV Viral Load',
                data : stats.hiv_viral_load,
                borderColor: ['#d11149'],
                backgroundColor: ['#d11149'],
            },
            {
                label: 'Hormonal Assay',
                data : stats.hormonal_assay,
                borderColor: ['#0b132b'],
                backgroundColor: ['#0b132b'],
            },
            {
                label: 'HVS C/S',
                data : stats.hvs_cs,
                borderColor: ['#3a7d44'],
                backgroundColor: ['#3a7d44'],
            },
            {
                label: 'HVS R/E',
                data : stats.hvs_re,
                borderColor: ['#5bc0be'],
                backgroundColor: ['#5bc0be'],
            },
            {
                label: 'Hypersensitive CPR',
                data : stats.hypersensitive_cpr,
                borderColor: ['#30292f'],
                backgroundColor: ['#30292f'],
            },
            {
                label: 'Iron Study',
                data : stats.iron_study,
                borderColor: ['#da2c38'],
                backgroundColor: ['#da2c38'],
            },
            {
                label: 'ISE',
                data : stats.ise,
                borderColor: ['#6610f2'],
                backgroundColor: ['#6610f2'],
            },
            {
                label: 'LFT',
                data : stats.lft,
                borderColor: ['#05668d'],
                backgroundColor: ['#05668d'],
            },
            {
                label: 'Lipid Profile',
                data : stats.lipid_profile,
                borderColor: ['#3a506b'],
                backgroundColor: ['#3a506b'],
            },
            {
                label: 'M Alb',
                data : stats.m_alb,
                borderColor: ['#1d263b'],
                backgroundColor: ['#1d263b'],
            },
            {
                label: 'Mantoux',
                data : stats.mantoux,
                borderColor: ['#226f54'],
                backgroundColor: ['#226f54'],
            },
            {
                label: 'NTC Screening',
                data : stats.ntc_screening,
                borderColor: ['#157f1f'],
                backgroundColor: ['#157f1f'],
            },
            {
                label: 'Pleural Fluid',
                data : stats.pleural_fluid,
                borderColor: ['#136f63'],
                backgroundColor: ['#136f63'],
            },
            {
                label: 'Pregnancy Test',
                data : stats.pregnancy_test,
                borderColor: ['#454372'],
                backgroundColor: ['#454372'],
            },
            {
                label: 'Protein Electrophoresis',
                data : stats.protein_electrophoresis,
                borderColor: ['#6c91bf'],
                backgroundColor: ['#6c91bf'],
            },
            {
                label: 'PSA',
                data : stats.psa,
                borderColor: ['#3e2f5b'],
                backgroundColor: ['#3e2f5b'],
            },
            {
                label: 'PTH',
                data : stats.pth,
                borderColor: ['#43291f'],
                backgroundColor: ['#43291f'],
            },
            {
                label: 'Pus Fluid',
                data : stats.pus_fluid,
                borderColor: ['#172a3a'],
                backgroundColor: ['#172a3a'],
            },
            {
                label: 'Reproductive Assay',
                data : stats.reproductive_assay,
                borderColor: ['#09bc8a'],
                backgroundColor: ['#09bc8a'],
            },
            {
                label: 'Rheumatology',
                data : stats.rheumatology,
                borderColor: ['#75dddd'],
                backgroundColor: ['#75dddd'],
            },
            {
                label: 'SC3 SC4',
                data : stats.sc3_sc4,
                borderColor: ['#301a4b'],
                backgroundColor: ['#301a4b'],
            },
            {
                label: 'Semen Analysis',
                data : stats.semen_analysis,
                borderColor: ['#7e6b8f'],
                backgroundColor: ['#7e6b8f'],
            },
            {
                label: 'Semen C/S',
                data : stats.semen_cs,
                borderColor: ['#44bba4'],
                backgroundColor: ['#44bba4'],
            },
            {
                label: 'Serum HCG_B',
                data : stats.serum_hcg_b,
                borderColor: ['#e7bb41'],
                backgroundColor: ['#e7bb41'],
            },
            {
                label: 'Serum Lipase',
                data : stats.serum_lipase,
                borderColor: ['#e56399'],
                backgroundColor: ['#e56399'],
            },
            {
                label: 'Skin Snip',
                data : stats.skin_snip,
                borderColor: ['#a14ebf'],
                backgroundColor: ['#a14ebf'],
            },
            {
                label: 'Specials',
                data : stats.specials,
                borderColor: ['#f2e94e'],
                backgroundColor: ['#f2e94e'],
            },
            {
                label: 'Sputum',
                data : stats.sputum,
                borderColor: ['#7a6563'],
                backgroundColor: ['#7a6563'],
            },
            {
                label: 'Sputum AFB',
                data : stats.sputum_afb,
                borderColor: ['#5bc8af'],
                backgroundColor: ['#5bc8af'],
            },
            {
                label: 'Stool C/S',
                data : stats.stool_cs,
                borderColor: ['#cc2936'],
                backgroundColor: ['#cc2936'],
            },
            {
                label: 'Stool R/E',
                data : stats.stool_re,
                borderColor: ['#08415c'],
                backgroundColor: ['#08415c'],
            },
            {
                label: 'TFT',
                data : stats.tft,
                borderColor: ['#a3d9ff'],
                backgroundColor: ['#a3d9ff'],
            },
            {
                label: 'Throat Swab C/S',
                data : stats.throat_swab_cs,
                borderColor: ['#2f2963'],
                backgroundColor: ['#2f2963'],
            },
            {
                label: 'Troponin',
                data : stats.troponin,
                borderColor: ['#744253'],
                backgroundColor: ['#744253'],
            },
            {
                label: 'Urethral C/S',
                data : stats.urethral_cs,
                borderColor: ['#ef946c'],
                backgroundColor: ['#ef946c'],
            },
            {
                label: 'Urine',
                data : stats.urine,
                borderColor: ['#c78283'],
                backgroundColor: ['#c78283'],
            },
            {
                label: 'Urine ACR',
                data : stats.urine_acr,
                borderColor: ['#2978a0'],
                backgroundColor: ['#2978a0'],
            },
            {
                label: 'Urine C/S',
                data : stats.urine_cs,
                borderColor: ['#70877f'],
                backgroundColor: ['#70877f'],
            },
            {
                label: 'Urine R/E',
                data : stats.urine_re,
                borderColor: ['#bcab79'],
                backgroundColor: ['#bcab79'],
            },
            {
                label: 'Widal',
                data : stats.widal,
                borderColor: ['#253031'],
                backgroundColor: ['#253031'],
            },
            {
                label: 'Wound C/S',
                data : stats.wound_cs,
                borderColor: ['#af2bbf'],
                backgroundColor: ['#af2bbf'],
            }
        ]
    }
    const options = {
        title: {
            display: true,
            text: 'Class/Gender Distribution'
        },
        // scales: {
        //     yAxes: [
        //         {
        //             ticks: {
        //                 min: 0,
        //                 max: 50,
        //                 stepSize: 10
        //             }
        //         }
        //     ]
        // }
    }

    return (
        <Card variant="outlined">
            <Line data={data} options={options} />
        </Card>
    )
}

export default Chart;
