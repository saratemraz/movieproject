import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Sidebar = ({ getPage, onCategorySelect, handleSortChange }) => {
    const categories = [
        "أكشن", 
        "مغامرة", 
        "رسوم متحركة", 
        "كوميديا", 
        "جريمة", 
        "وثائقي", 
        "دراما", 
        "عائلي", 
        "خيال", 
        "تاريخ", 
        "رعب", 
        "موسيقى", 
        "غموض", 
        "رومانسية", 
        "خيال علمي", 
        "فيلم تلفزيوني", 
        "إثارة", 
        "حرب", 
        "ويسترن"
    ]; // التصنيفات باللغة العربية

    const handleCategoryClick = (category) => {
        onCategorySelect(category); // استدعاء الدالة عند اختيار تصنيف
    };

    return (
        <div className="sidebar">
            <h5>التصنيفات</h5>
            <Dropdown as={ButtonGroup} className="mb-3">
                <DropdownButton
                    variant="secondary"
                    title="اختر تصنيف"
                    id="dropdown-split-basic"
                >
                    {categories.map((category) => (
                        <Dropdown.Item 
                            key={category} 
                            onClick={() => handleCategoryClick(category)}>
                            {category}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </Dropdown>

            <h5 className="mt-3">ترتيب حسب</h5>
            <Dropdown as={ButtonGroup} className="mb-3">
                <DropdownButton
                    variant="secondary"
                    title="اختر ترتيب"
                    id="dropdown-split-basic-sort"
                >
                    <Dropdown.Item onClick={() => handleSortChange('popular')}>الأكثر شعبية</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('top_rated')}>الأعلى تقييماً</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('now_playing')}>حالياً في السينما</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('upcoming')}>الأفلام القادمة</Dropdown.Item>
                </DropdownButton>
            </Dropdown>
        </div>
    );
};

export default Sidebar;
