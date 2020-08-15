import moment from 'moment';

export const getGenderOptions = () => {
    return [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ];
}
export const getDate = () => {
    return new Date();
}
export const getMaxDate = () => {
    const date  = getDate();
    const day   = date.getDate() < 10 ? '0'+(date.getDate()) : (date.getDate());
    const month = date.getMonth() < 10 ? '0'+(1+date.getMonth()) : (1+date.getMonth());
    const year  = date.getFullYear();
    
    return year+'-'+month+'-'+day;
}
export const getMinBookingDate = () => {
    return moment().add(7, 'days').format('YYYY[-]MM[-]DD');
}
export const toCapitalCase = (string) => {
    const array    = string.split(' ');
    let new_string = '';
    
    for (var index = 0; index < array.length; index++) {
        const first_letter = array[index].substr(0, 1);
        const remaining    = array[index].substr(1, array[index].length);
        new_string         += first_letter.toUpperCase() + remaining.toLowerCase()+' ';
        // console.log(new_string)
    }
    return new_string.trim();
}
export const get_permissions = () => {
    return [
        { label: "Charges",                value: "Charges", disabled: true },
        { label: "Can Create Charge",      value: "Can Create Charge" },
        { label: "Can Edit Charge",        value: "Can Edit Charge" },
        { label: "Can View Charges List",  value: "Can View Charges List" },

        { label: "Lab",                    value: "Lab",      disabled: true },
        { label: "Can Create Lab",         value: "Can Create Lab" },
        { label: "Can Edit Lab",           value: "Can Edit Lab" },
        { label: "Can Pay Lab",            value: "Can Pay Lab" },
        { label: "Can View Lab",           value: "Can View Lab" },
        { label: "Can View Lab List",      value: "Can View Lab List" },

        { label: "Patients",               value: "Patients", disabled: true },
        { label: "Can Create Patient",     value: "Can Create Patient" },
        { label: "Can Edit Patient",       value: "Can Edit Patient" },
        { label: "Can View Patient",       value: "Can View Patient" },
        { label: "Can View Patients List", value: "Can View Patients List" },

        { label: "Reports",                value: "Reports",  disabled: true },
        { label: "Can Create Reports",     value: "Can Create Reports" },

        { label: "Staff",                  value: "Staff",    disabled: true },
        { label: "Can Create Staff",       value: "Can Create Staff" },
        { label: "Can Edit Staff",         value: "Can Edit Staff" },
        { label: "Can View Staff",         value: "Can View Staff" },
        { label: "Can View Staff List",    value: "Can View Staff List" },
        { label: "Can Block Staff",        value: "Can Block Staff" },
        { label: "Can Unblock Staff",      value: "Can Unblock Staff" },
    ];
    // return ["Can Create Lab","Can Edit Lab","Can View Lab","Can Pay Lab","Can View Lab List",
    //         "Can Create Charge","Can Edit Charge","Can View Charges List",
    //         "Can Create Patient","Can Edit Patient","Can View Patient","Can View Patients List","Can Create Reports",
    //         "Can Create Staff","Can Edit Staff","Can View Staff","Can View Staff List","Can Block Staff","Can Unblock Staff"
    //        ].sort();
}
export const get_total_amount = (array) => {
    let total_amount = 0.00;
    array.forEach(value => {
        total_amount += +value['amount'];
    });
    
    return total_amount;
}
export const get_permission_for_role = permissions => {
    let array = [];
    permissions.forEach(permission => {
        array.push({ label: permission, value: permission });
    });

    return array;
}
export const isPrefixValid = (number) => {
    const prefixes = ["020", "023", "024", "026", "027", "028", "029", "030", "030", "031", "032", "050", "054", "055", "056", "057"];

    return prefixes.includes(number);
}
export const pop_first_comma = (array) => {
    if(array[0] === '' || array[0].length === 0) {
        return array.slice(1);
    }

    return array;
}
export const getAge   = (birthDay) => {
    const birthday    = birthDay.split('-');
    const birth_month = birthday[1];
    const birth_day   = birthday[2];
    const birth_year  = birthday[0];

    let todays_date   = new Date();
    let today_year    = todays_date.getFullYear();
    let today_month   = todays_date.getMonth();
    let today_day     = todays_date.getDate();
    let age           = today_year - birth_year;

    if(today_month < (birth_month - 1)) {
        age--;
    }
    if(((birth_month - 1) === today_month) && (today_day < birth_day)) {
        age--;
    }

    return age;
}
export const get_months_short = () => {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}
export const get_months_full = () => {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
}
export const getTodaysDate = () => {
    const months = get_months_short();
	const date   = new Date();
    // return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}
export const get_todays_date_full = () => {
    const months  = get_months_full();
    const date    = new Date();
    const day     = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    const hours   = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    return day + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' - ' + hours + ':' + minutes + ':' + seconds;
    // return months[date.getMonth()] + ' ' + day + ', ' + date.getFullYear() + ' - ' + hours + ':' + minutes + ':' + seconds;
}
export const get_current_year = () => {
	const date = new Date();
    return date.getFullYear().toString();
}
export const get_roles_options = () => {
    return ["Administrator", "Front Desk", "Lab Technician"];
}
export const getQuantities = () => {
    return [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ];
}
export const getServices = () => {
    return [
        { value: 'Full Service', label: 'Full Service - Mail us your art, and we\'ll custom frame it' },
        { value: 'Frame Only', label: 'Frame Only - We\'ll build and ship your frame without art' },
    ];
}
export const getMailInMethods = () => {
    return [
            'Flat Mailer',
            'Tube', 'Box',
            'Print Your Own Label',
            'Art en Route'
        ];
}
export const getFrameModel = () => {
    return [
        { label: 'Gallery White - GHS 88.00', value: 'Gallery White' },
        { label: 'Gallery Natural - GHS 75.00', value: 'Gallery Natural' },
        { label: 'Gallery Black - GHS 88.00', value: 'Gallery Black' },
        { label: 'Gallery Light Walnut - GHS 75.00', value: 'Gallery Light Walnut' },
        { label: 'Gallery Walnut', value: 'Gallery Walnut' },
        { label: 'Gallery Dark Walnut - GHS 75.00', value: 'Gallery Dark Walnut' },
        { label: 'Gallery Stainless Silver - GHS 75.00', value: 'Gallery Stainless Silver' },
        { label: 'Certificate Silver - GHS 88.00', value: 'Certificate Silver' },
        { label: 'Certificate Gold - GHS 88.00', value: 'Certificate Gold' },
        { label: 'Certificate Black and Gold - GHS 88.00', value: 'Certificate Black and Gold' },
        { label: 'Gallery Mid White - GHS 45.00', value: 'Gallery Mid White' },
        { label: 'Gallery Mid Natural - GHS 45.00', value: 'Gallery Mid Natural' },
        { label: 'Gallery Mid Black - GHS 45.00', value: 'Gallery Mid Black' },
        { label: 'Gallery Deep White - GHS 75.00', value: 'Gallery Deep White' },
        { label: 'Gallery Deep Natural', value: 'Gallery Deep Natural' },
        { label: 'Gallery Deep Black - GHS 75.00', value: 'Gallery Deep Black' },
        { label: 'Gallery Deep Ash', value: 'Gallery Deep Ash' },
        { label: 'Gallery Deep Walnut - GHS 42.00', value: 'Gallery Deep Walnut' },
        { label: 'Certificate Wide Silver - GHS 45.00', value: 'Certificate Wide Silver' },
        { label: 'Certificate Wide Gold - GHS 45.00', value: 'Certificate Wide Gold' },
        { label: 'Max Plexibox White - GHS 89.00', value: 'Max Plexibox White' },
        { label: 'Max Plexibox Natural - GHS 89.00', value: 'Max Plexibox Natural' },
        { label: 'Max Plexibox Neon Pink - GHS 114.00', value: 'Max Plexibox Neon Pink' },
        { label: 'Max Plexibox Neon Orange - GHS 114.00', value: 'Max Plexibox Neon Orange' },
        { label: 'Max Plexibox Neon Lime - GHS 114.00', value: 'Max Plexibox Neon Lime' },
        { label: 'Max Plexibox Aqua - GHS 114.00', value: 'Max Plexibox Aqua' },
        { label: 'Max Plexibox Blue - GHS 114.00', value: 'Max Plexibox Blue' },
    ];
}
export const getMatSize = () => {
    return [
        '0 1/2 inches',
        '1 inches',
        '1 1/2 inches',
        '2 inches',
        '2 1/2 inches',
        '3 inches',
        '3 1/2 inches',
        '4 inches',
        '4 1/2 inches',
        '5 inches'
    ];
}
export const getMatStyle = () => {
    return [
        { label: 'No Mat - No mat keeps the appearance of your framing clean and simple', value: 'No Mat' },
        { label: 'Single Mat - A single mat keeps the eye focused on your art', value: 'Single Mat' },
        { label: 'Double Mat - Two layered mats. ¼" of the lower mat peeks out, creating a border around the art', value: 'Double Mat' },
        { label: 'Floated - Art appears to float over the mat, and a spacer prevents the image from touching the acrylic', value: 'Floated' },
        { label: 'Island - Art appears to float inside the mat window over an uncut bottom mat', value: 'Island' },
        { label: 'Article - A single mat with multiple openings for the publication title and article', value: 'Article' },
    ];
}
export const getMatMaterial = () => {
    return [
        { label: '4-Ply Framer\'s Choice White', value: '4-Ply Framer\'s Choice White' },
        { label: '4-Ply Paper White', value: '4-Ply Paper White' },
        { label: '4-Ply Bright White', value: '4-Ply Bright White' },
        { label: '4-Ply Artique Digital White', value: '4-Ply Artique Digital White' },
        { label: '4-Ply Black', value: '4-Ply Black' },
        { label: 'Linen Bright White - GHS 56.00', value: 'Linen Bright White' },
    ];
}
export const getMountingMethod = () => {
    return [
        { label: 'Hinge Mount to Hidden Lift - Art is attached to a ³∕₁₆" lift, so it appears to float in the mat window.', value: 'Hinge Mount to Hidden Lift' },
        { label: 'Dry Mount to Hidden Lift - An acid-free, permanent adhesive secures art to a hidden ³∕₁₆" lift so it appears to float.', value: 'Dry Mount to Hidden Lift' },
        { label: 'Hinge Mount without Lift - Removable tape secures art with minimal contact.', value: 'Hinge Mount without Lift' },
    ];
}
export const getAcrylicType = () => {
    return [
        { label: 'Standard Acrylic - Protects art from 82–85% of UV rays. Shatter resistant', value: 'Standard Acrylic' },
        { label: '99% UV Acrylic - Protects art from 99% of UV rays. Recommended if art will hang in a bright area - GHS 18.00', value: '99% UV Acrylic' },
        { label: 'Tru Vue Optium - Museum-quality, anti-reflective, anti-static, and scratch resistant. Protects art from 99% of UV rays - GHS 251.00', value: 'Tru Vue Optium' },
        { label: 'No Acrylic - Art is not protected from the elements - GHS 11.00', value: 'No Acrylic' },
    ];
}
export const getSpacer = () => {
    return ['Shadowbox', 'Acrylic' ];
}
export const getHangingHardware = () => {
    return [
        { label: 'Wire - Strong tension wire, wrapped around D-rings, is stretched on the back of the frame', value: 'Wire' },
    ];
}
export const getHeading = type => {
    let newType = type.toLowerCase().replace("-", " ");
    newType     = newType.toLowerCase().replace("-", " ");
    return toCapitalCase(newType);
}
export const getHeadingFull = type => {
    let newType = type.toLowerCase().replace("-", " ");
    newType     = newType.toLowerCase().replace("-", " ");
    
    newType = newType.startsWith('a') ||
    newType.startsWith('e') ||
    newType.startsWith('i') ||
    newType.startsWith('o') ||
    newType.startsWith('u') ? 'an '+newType : 'a '+newType;
    
    newType = toCapitalCase('Frame '+newType);
    return newType;
}
export const getRegions = () => {
    return [
        'Ahafo',
        'Ashanti',
        'Bono',
        'Bono East',
        'Central',
        'Eastern',
        'Greater Accra',
        'North East',
        'Northern',
        'Oti',
        'Savannah',
        'Upper East',
        'Upper West',
        'Volta',
        'Western',
        'Western North',
    ];
}
