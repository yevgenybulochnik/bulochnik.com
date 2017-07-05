export class ChadsVasc {
    riskcalc_name: string;
    riskfactors: RiskFactor[];
    scores: string[];
    constructor() {
        this.riskcalc_name = 'CHADS-Vasc';
        this.riskfactors = [
            new RiskFactor('Congestive Heart Failure', 'CHF', 1),
            new RiskFactor('Hypertension', 'HTN', 1),
            new RiskFactor('Age between 65 and 75', 'AGE 65-75', 1),
            new RiskFactor('Age over 75', 'AGE >75', 2),
            new RiskFactor('Diabetes', 'DM', 1),
            new RiskFactor('CVA/TIA', 'CVA', 2),
            new RiskFactor('Female', 'Female', 1),
            new RiskFactor('Coronary Artery Disease', 'CAD', 1)
            ];
        this.scores = [
            '',
            '0.6%',
            '2.2%',
            '3.2%',
            '4.8%',
            '7.2%',
            '9.7%',
            '11.2%',
            '10.8%',
            '12.2%'
            ]
    }
}

export class HasBled {
    riskcalc_name: string;
    riskfactors: RiskFactor[];
    scores: string[];
    constructor() {
        this.riskcalc_name = 'HasBled';
        this.riskfactors = [
            new RiskFactor('Hypertension', 'HTN', 1),
            new RiskFactor('Renal Failure', 'Renal', 1),
            new RiskFactor('Liver Failure', 'Liver', 1),
            new RiskFactor('CVA/TIA', 'CVA', 2),
            new RiskFactor('Bleeding History', 'Bleed', 1),
            new RiskFactor('Labile INR', 'Labile INR', 1),
            new RiskFactor('Age > 65', 'Age >65', 1),
            new RiskFactor('ETOH Intake', 'ETOH', 1),
            new RiskFactor('Other Anticoagulants', 'Thinners', 1)
            ];
        this.scores = [
             '',
            '3.4%',
            '4.1%',
            '5.8%',
            '8.9%',
            '9.1%',
            '>10%',
            '>10%',
            '>10%',
            '>10%'
        ]
    }
}

export class RiskFactor {
    name: string;
    abv: string;
    value: number;
    is_clicked: boolean;
    constructor(name: string, abv: string, value: number) {
        this.name = ' ' + name;
        this.abv = abv;
        this.value = value;
        this.is_clicked = false;
    }
}
