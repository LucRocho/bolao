class util {

    formatDateYYYYMMDD(date){
        let newDate=new Date(date);
        let completaZeroMes='';
        if (newDate.getMonth()+1<10){
            completaZeroMes='0';
        }
        let completaZeroDia='';
        if (newDate.getDate()<10){
            completaZeroDia='0';
        }
        return (newDate.getFullYear() + "-" + completaZeroMes + ((newDate.getMonth() + 1)) + "-"+ completaZeroDia + (newDate.getDate()));
    }

    formatDateHHMMSS(date){
        let newDate=new Date(date);
        let hora=newDate.getHours();
        if (hora<10){
            hora='0'+hora.toString();
        }

        let minuto=newDate.getMinutes();
        if (minuto<10){
            minuto='0'+minuto.toString();
        }

        let segundo=newDate.getSeconds();
        if (segundo<10){
            segundo='0'+segundo.toString();
        }
        

        return (hora+':'+minuto+':'+segundo);
    }

    formatStringDateDDMMYYYY2YYYYMMDD(strDate){
        console.log(strDate)
        const year=strDate.substring(5,4)
        const day=strDate.substring(0,2)
        const month=strDate.substring(3,2)
        const time=(strDate.length>10?strDate.substring(10):'')
        const ret = year+'-'+month+'-'+day + time
        console.log(ret)
        return ret
    }

    paramsToQueryString(params){
        let queryString=Object.keys(params).map(key => {
            return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            )
        }).join('&');
        return queryString;
    }

    object2FormData(obj,idLoggedUser){
        
        let formData=new FormData();
        Object.entries(obj).forEach(([key, value]) => {
            formData.append(key, value);
            
        });
        if (idLoggedUser){
            formData.append('loggedUserId',idLoggedUser);
        }
        
        return formData;
    }
    
}

export default new util();