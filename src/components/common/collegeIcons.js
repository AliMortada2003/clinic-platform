// components/common/collegeIcons.js
import {
    Stethoscope,
    Pill,
    Dog,
    HeartPulse,
    FlaskConical,
    Cpu,
    Wrench,
    Calculator,
    BookOpen,
    GraduationCap,
    Leaf,
    Landmark,
    Languages,
    Scale,
    Dumbbell,
    Palette,
    Building2,
    Hospital,
} from "lucide-react";

export const COLLEGE_ICONS = [
    { key: "Medicine", Icon: Stethoscope },
    { key: "Pharmacy", Icon: Pill },
    { key: "Vet", Icon: Dog },
    { key: "Nursing", Icon: HeartPulse },
    { key: "Science", Icon: FlaskConical },
    { key: "CS_AI", Icon: Cpu },
    { key: "Engineering", Icon: Wrench },
    { key: "Commerce", Icon: Calculator },
    { key: "Arts", Icon: BookOpen },
    { key: "Education", Icon: GraduationCap },
    { key: "Agriculture", Icon: Leaf },
    { key: "Archaeology", Icon: Landmark },
    { key: "Languages", Icon: Languages },
    { key: "Law", Icon: Scale },
    { key: "PE", Icon: Dumbbell },
    { key: "Fine_Arts", Icon: Palette },
    { key: "Technical_Nursing", Icon: Hospital },
];

export function getIconByKey(key) {
    if (!key) return Building2;

    const found = COLLEGE_ICONS.find(
        (x) => x.key.toLowerCase() === String(key).toLowerCase()
    );

    return found?.Icon || Building2;
}
