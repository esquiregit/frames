export const getBack = history => {
    if(history) {
        history.goBack();
    } else {
        history.push('/dashboard/');
    }
}